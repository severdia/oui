import React from 'react';
import PropTypes from 'prop-types';

import DiscloseRow from './Row';

let DiscloseTable = ({
  children,
  testSection,
}) => {
  return (
    <table
      data-oui-component={ true }
      className='oui-disclose-table'
      style={{ tableLayout: 'auto' }}
      data-test-section={ testSection }>
      { children }
    </table>
  );
};

DiscloseTable.propTypes = {
  /** Should be a `Table.THead` or `Table.TBody` */
  children: PropTypes.node.isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

DiscloseTable.Row = DiscloseRow;

export default DiscloseTable;
