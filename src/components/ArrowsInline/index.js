import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const ArrowsInline = ({
  direction,
  testSection,
}) => {
  let classes = classNames({
    [`oui-arrow-inline--${direction}`]: direction,
  });

  return (
    <span
      data-oui-component={ true }
      className={ classes }
      aria-hidden="true"
      data-test-section={ testSection }>
    </span>
  );
};

ArrowsInline.defaultProps = {
  direction: 'down',
};

ArrowsInline.propTypes = {
  /** Direction the arrow points */
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default ArrowsInline;
