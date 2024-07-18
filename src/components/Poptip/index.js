import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import { waitForSelector } from '../../utils/poll';
import classNames from 'classnames';

import { Tooltip } from 'react-tippy';

/**
 * Displays help text when hovering on an element.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
@withState('bodyDefined', 'setBodyDefined', !!document.body)
class Poptip extends React.Component {
  constructor(props) {
    super(props);
    // Set the bodyDefined prop to true when the body is ready
    waitForSelector('body').then((documentBody) => props.setBodyDefined(!!documentBody)); // eslint-disable-line react/prop-types
  }

  static displayName = 'Poptip';

  static propTypes = {
    /** Content that, when hovered on, makes the Poptip appear */
    children: PropTypes.node.isRequired,
    /** content could be a node of a string */
    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
    /** how long it takes after a trigger event is fired for a tooltip to show |
     * default => 0 */
    delay: PropTypes.number,
    /** disable value | default => false */
    disable: PropTypes.bool,
    /** how long it takes after a trigger event is fired for a tooltip to hide |
     * default => 0 */
    hideDelay: PropTypes.number,
    /** should the poptip content be animated | default => true */
    isAnimated: PropTypes.bool,
    /** should the poptip be displayed inline */
    isInline: PropTypes.bool,
    /** position value options | default => top */
    position: PropTypes.oneOf([
      'top',
      'bottom',
      'left',
      'right',
    ]),
    /** background color | default => dark */
    theme: PropTypes.oneOf([
      'dark',
      'light',
      'transparent',
    ]),
    /** trigger value options | default => mouseenter focus */
    trigger: PropTypes.oneOf([
      'mouseenter',
      'focus',
      'click',
      'manual',
    ]),
  };

  // trigger prop left out as Trigger default, 'mouseenter focus', will be used
  static defaultProps = {
    delay: 0,
    disable: false,
    hideDelay: 0,
    isAnimated: true,
    isInline: false,
    position: 'top',
    theme: 'dark',
  };

  renderPoptip = () => {
    const {
      children,
      content,
      delay,
      disable,
      hideDelay,
      isAnimated,
      isInline,
      position,
      trigger,
      theme,
    } = this.props;

    const wrapperInline = classNames({
      'display--inline': isInline,
    });

    return (
      <Tooltip
        arrow={ true }
        disabled={ disable }
        delay={ [delay, hideDelay] }
        { ...(!isAnimated ? { duration: 0 } : {}) }
        html={ <div className="force-break">{content}</div> }
        position={ position }
        theme={ theme }
        trigger={ trigger }>
        <div className={ wrapperInline }>{ children }</div>
      </Tooltip>
    );
  };

  render() {
    const { bodyDefined } = this.props; // eslint-disable-line react/prop-types
    return bodyDefined ? this.renderPoptip() : null;
  }
}

export default Poptip;
