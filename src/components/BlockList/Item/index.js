import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this._handleOnKeyDown = this._handleOnKeyDown.bind(this);
  }

  _handleOnKeyDown(event) {
    if (event && event.keyCode === 32 && event.target === this._itemWithOnClick) {
      // Space key was pressed on the item, not a child of the item.
      // Run the `onClick` and prevent the page from scrolling.
      event.preventDefault();
      this.props.onClick();
    }
  }

  render() {
    let item;
    const commonClasses = classNames({
      'oui-block-list__item': true,
      'hard--sides': this.props.gutters === 'tight',
    });

    if (this.props.isDisabled) {
      item = (
        <div
          className={ `${commonClasses} pointer-events--none background--faint muted` }>
          { this.props.children }
        </div>
      );
    } else if (this.props.onClick) {
      // The element is rendered as a `div` instead of a `button` because the
      // user may want to pass in a `button` within `this.props.children`.
      // `tabIndex`, `role`, and `onKeyDown` are provided to make the `div`
      // behave like a button: https://mzl.la/1mRMvQj
      item = (
        <div
          className={ `${commonClasses} link oui-block-list__link` }
          onClick={ this.props.onClick }
          onKeyDown={ this._handleOnKeyDown }
          tabIndex="0"
          role="button"
          ref={ (el) => { this._itemWithOnClick = el; } }>
          { this.props.children }
        </div>
      );
    } else if (this.props.href) {
      item = (
        <a
          href={ this.props.href }
          className={ `${commonClasses} oui-block-list__link display--block` }
          target={ this.props.hrefTarget }
          title={ this.props.hrefTitle }
          rel={ this.props.hrefTarget === '_blank' && 'noopener noreferrer' }>
          { this.props.children }
        </a>
      );
    } else {
      item = (
        <div
          className={ commonClasses } onMouseDown={ this.props.onMouseDown }
          { ...this.props.testSection && { 'data-test-section': this.props.testSection + '-item' } }>
          { this.props.children }
        </div>
      );
    }

    return (
      <li
        style={{ wordBreak: 'break-word' }}
        data-test-section={ this.props.testSection }>
        { item }
      </li>
    );
  }
}

Item.propTypes = {
  /** String or JSX that appears within the component */
  children: PropTypes.node.isRequired,
  /** Determines level of padding of item */
  gutters: PropTypes.oneOf(['loose', 'tight']),
  /** URL to navigate to when clicking on the item */
  href: PropTypes.string,
  /** Target that the link, if provided, should open in */
  hrefTarget: PropTypes.oneOf(['_self', '_blank']),
  /** Sets the `title` attribute on an `href` */
  hrefTitle: PropTypes.string,
  /** Disable the item */
  isDisabled: PropTypes.bool,
  /** Function that is run when clicking on the item */
  onClick: PropTypes.func,
  /** Function that is run when mouse-down event is fired on the item */
  onMouseDown: PropTypes.func,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

Item.defaultProps = {
  gutters: 'loose',
};

Item.displayName = 'BlockList.Item';

export default Item;
