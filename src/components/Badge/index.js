import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Tiny inline component used to draw attention to an item's state or status.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const Badge = (props) => {
  let classes = classNames({
    'oui-badge': true,
    [`oui-badge--${props.color}`]: props.color,
  });

  return (
    <span
      data-oui-component={ true }
      className={ classes }
      data-test-section={ props.testSection }>
      { props.children }
    </span>
  );
};

Badge.propTypes = {
  /** Text that appears within the component */
  children: PropTypes.node.isRequired,
  /** Various color schemes */
  color: PropTypes.oneOf(['default', 'draft', 'live', 'primary', 'plain', 'bad-news']),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

Badge.defaultProps = {
  color: 'default',
};

export default Badge;
