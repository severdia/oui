import React from 'react';
import PropTypes from 'prop-types';
import Tether from 'tether';
import { waitForSelector } from '../../utils/poll';

/**
 * Intelligently position elements on a page.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

class OverlayWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOverlayOpen: false };
    this.onChildClick = this.onChildClick.bind(this);
    this.onChildMouseOver = this.onChildMouseOver.bind(this);
    this.onChildMouseOut = this.onChildMouseOut.bind(this);
    this.disableTether = this.disableTether.bind(this);
  }

  getChildContext() {
    return {
      hideOverlay: this.disableTether,
    };
  }

  componentDidMount() {
    let options = {
      element: this._overlayEl,
      target: this._activatorEl.firstChild,
      attachment: `${this.props.verticalAttachment} ${this.props.horizontalAttachment}`,
      constraints: [{
        to: 'window',
        attachment: this.props.attachmentConstraint,
        pin: this.props.isConstrainedToScreen,
      }],
    };

    if (this.props.verticalTargetAttachment && this.props.horizontalTargetAttachment) {
      options.targetAttachment = `${this.props.verticalTargetAttachment} ${this.props.horizontalTargetAttachment}`;
    }

    // Because Tether will err if createTether is called when the body element
    // is not available, we need to wait for the body. The waitForSelector util
    // uses a recursive timeout and can be used because we know the body
    // is certain to be available eventually.
    waitForSelector('body').then(() => {
      this._tether = this.createTether(options);
      // Disable Tether after creation for performance improvements.
      // This is okay since it is hidden by default.
      this.disableTether();
    });
  }

  enableTether() {
    // If tether hasn't been created, return early
    if (!this._tether) {
      return;
    }

    this.setState({ 'isOverlayOpen': true });
    this._tether.enable();

    if (typeof this.props.onShow === 'function') {
      this.props.onShow();
    }

    // Reposition once the overlay is visible because Tether can't
    // properly calculate the positioning when the overlay is not
    // displayed.
    setTimeout(() => {
      this._tether.position();
    });

    // These functions must be stored so that it can be still be removed even
    // though `bind` was used: http://stackoverflow.com/a/22870717/316602
    this._bodyClickListener = this.props.shouldHideOnClick && this.isClickWithinOverlayOrChildren.bind(this);
    this._documentEscapeListener = this.onEscapeKey.bind(this);

    if (this._bodyClickListener) {
      document.addEventListener('click', this._bodyClickListener);
    }

    document.addEventListener('keyup', this._documentEscapeListener);
  }

  disableTether() {
    // If tether hasn't been created, return early
    if (!this._tether) {
      return;
    }

    let shouldHide = true;
    if (typeof this.props.onHide === 'function') {
      shouldHide = this.props.onHide();
    }

    if (shouldHide === false) {
      // Exit out of this function before hiding the `overlay` if the supplied
      // `onHide` function returns false. This is useful for fine-tuned control
      // of when the `overlay` should close.
      return;
    }

    this.setState({ 'isOverlayOpen': false });
    this._tether.disable();
    this.removeBodyEventListner();
  }

  removeBodyEventListner() {
    if (this._bodyClickListener) {
      document.removeEventListener('click', this._bodyClickListener);
    }
    if (this._documentEscapeListener) {
      document.removeEventListener('keyup', this._documentEscapeListener);
    }
  }

  /**
    * Disable Tether if a user clicks outside of the `overlay` and `children`.
    * @param {Object} event - Click event
   */
  isClickWithinOverlayOrChildren(event) {
    let target = event.target;
    let shouldCloseOverlay = true;

    while (target.parentNode !== null && shouldCloseOverlay) {
      if (target === this._overlayEl || target === this._activatorEl) {
        shouldCloseOverlay = false;
      }
      target = target.parentNode;
    }

    if (shouldCloseOverlay) {
      this.disableTether();
    }
  }

  componentWillUnmount() {
    this.removeBodyEventListner();
    // If tether hasn't been created, return early
    if (!this._tether) {
      return;
    }
    this._tether.destroy();
    if (this._tether.element && this._tether.element.remove) {
      this._tether.element.remove();
    }
  }

  createTether(options) {
    return new Tether(options);
  }

  onChildClick(event, child) {
    // Toggle the `overlay` by enabling or disabling Tether.
    if (this.state.isOverlayOpen) {
      // Disable Tether when not visible for performance reasons.
      this.disableTether();
    } else {
      // Enable Tether when visible.
      this.enableTether();
    }

    // Run the `children`'s `onClick` if it exists.
    if (child.props.onClick) {
      child.props.onClick(event);
    }
  }

  onChildMouseOver(event, child) {
    // Enable Tether when visible.
    this.enableTether();

    // Run the `children`'s `onMouseOver` if it exists.
    if (child.props.onMouseOver) {
      child.props.onMouseOver(event);
    }
  }

  onChildMouseOut(event, child) {
    // Disable Tether when not visible for performance reasons.
    this.disableTether();

    // Run the `children`'s `onMouseOut` if it exists.
    if (child.props.onMouseOut) {
      child.props.onMouseOut(event);
    }
  }

  onEscapeKey(event) {
    // Escape key
    if (event.keyCode === 27) {
      this.disableTether();
    }
  }

  render() {
    const {
      behavior,
      children,
      overlay,
      testSection,
    } = this.props;
    let eventHandlerProps;
    let child = React.Children.only(children);

    switch (behavior) {
      case 'click':
        eventHandlerProps = {
          onClick: (event) => this.onChildClick.call(null, event, child),
        };
        break;
      case 'hover':
        eventHandlerProps = {
          onMouseOver: (event) => this.onChildMouseOver.call(null, event, child),
          onMouseOut: (event) => this.onChildMouseOut.call(null, event, child),
        };
        break;
      default:
    }

    const block = { display: 'inline-block' };
    const overlayState = this.state.isOverlayOpen ? { display: 'block' } : { display: 'none' };

    return (
      /* eslint-disable react/jsx-no-bind */
      <div
        data-oui-component={ true }
        data-test-section={ testSection }
        style={ block }>
        <div
          className='click-area'
          style={ block }
          ref={ (ref) => { this._activatorEl = ref; } }
          { ...eventHandlerProps }>
          { child }
        </div>
        <div
          ref={ (ref) => { this._overlayEl = ref; } }
          style={ overlayState }>
          { overlay }
        </div>
      </div>
      /* eslint-enable */
    );
  }
}

OverlayWrapper.propTypes = {
  /** Determines how the attachment is constrained to the target */
  attachmentConstraint: PropTypes.oneOf(['both', 'element', 'none', 'target', 'together']),
  /** Event to listen to and open the overlay */
  behavior: PropTypes.oneOf(['click', 'hover']),
  /** Element that the `overlay` should attach to */
  children: PropTypes.node.isRequired,
  /** Side of the `overlay` that should attach to the `children` */
  horizontalAttachment: PropTypes.oneOf(['left', 'center', 'right']),
  /** Side of `children` that should attach to the `overlay` */
  horizontalTargetAttachment: PropTypes.oneOf(['left', 'center', 'right']),
  /** Attach `overlay` to an edge of the screen if it is going to move off */
  isConstrainedToScreen: PropTypes.bool,
  /**
   * Function that runs when the `overlay` is hidden. Return `false` to prevent
   * the `overlay` from closing.
   */
  onHide: PropTypes.func,
  /** Function that runs when the `overlay` is shown */
  onShow: PropTypes.func,
  /** The element that is attached to the children */
  overlay: PropTypes.node.isRequired,
  /** Should the `overlay` close when clicking outside of it */
  shouldHideOnClick: PropTypes.bool,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** Vertical edge of the `overlay` that should touch the `children` */
  verticalAttachment: PropTypes.oneOf(['top', 'middle', 'bottom']),
  /** Vertical edge of the `children` that should touch the `overlay` */
  verticalTargetAttachment: PropTypes.oneOf(['top', 'middle', 'bottom']),
};

OverlayWrapper.defaultProps = {
  attachmentConstraint: 'together',
  behavior: 'click',
  isConstrainedToScreen: false,
  shouldHideOnClick: true,
  horizontalAttachment: 'center',
  verticalAttachment: 'top',
};

OverlayWrapper.childContextTypes = {
  hideOverlay: PropTypes.func,
};

export default OverlayWrapper;
