import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Generates an `spinner` element with/without overlay and optinaly
 * using props for sizes small or tiny for smaller sizes.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const Spinner = ({
  size,
  hasOverlay,
  testSection,
}) => {
  const classes = classNames(
    'oui-spinner',
    {[`oui-spinner--${size}`]: size}
  );
  if (hasOverlay) {
    return (
      <div
        data-oui-component={ true }
        data-test-section={ testSection }
        className="oui-overlay">
        <div className={ classes }></div>
      </div>
    );
  }
  return <div data-test-section={ testSection } className={ classes }></div>;
};

Spinner.propTypes = {
  /** boolean class for establish overlay */
  hasOverlay: PropTypes.bool,
  /** various sizes */
  size: PropTypes.oneOf(['small', 'tiny']),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

Spinner.displayName = 'Spinner';

export default Spinner;
