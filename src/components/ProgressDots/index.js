import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generates an `ProgressDots`
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const ProgressDots = ({ testSection }) => {
  return (
    <ul
      data-oui-component={ true }
      data-test-section={ testSection }
      className="oui-progress-dots">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};

ProgressDots.propTypes = {
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

ProgressDots.displayName = 'ProgressDots';

export default ProgressDots;
