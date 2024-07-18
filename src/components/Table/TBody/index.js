import React from 'react';
import PropTypes from 'prop-types';

const TBody = ({
  children,
  testSection,
}) => {
  return (
    <tbody data-test-section={ testSection }>
      { children }
    </tbody>
  );
};

TBody.propTypes = {
  /** Should be a `Table.TR` component */
  children: PropTypes.node,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

TBody.displayName = 'Table.TBody';

export default TBody;
