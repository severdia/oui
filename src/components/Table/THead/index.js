import React from 'react';
import PropTypes from 'prop-types';

const THead = ({
  children,
  testSection,
}) => {
  return (
    <thead data-test-section={ testSection }>
      { children }
    </thead>
  );
};

THead.propTypes = {
  /** Should be a `Table.TR` component */
  children: PropTypes.node,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

THead.displayName = 'Table.THead';

export default THead;
