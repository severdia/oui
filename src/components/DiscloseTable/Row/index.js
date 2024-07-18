import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import { toClass } from 'recompose';
import { withToggle } from '../../../utils/recompose-utils';

const DiscloseRow = function({
  isOpen,
  children,
  rowContents,
  toggle,
}) {
  const linkClass = classNames(
    'oui-disclose-table--row__toggle',
    {
      ['is-active']: isOpen,
    },
  );
  return (
    <React.Fragment>
      <tr onClick={ toggle } className={ linkClass }>
        <td className='soft--left vertical-align--middle'>
          <span className="oui-disclose__symbol push-half--right"></span>
        </td>
        {rowContents}
      </tr>
      {
        isOpen && (
          <tr className="oui-disclose-table--row__content">
            <td colSpan={ rowContents.length + 1 }>
              {children}
            </td>
          </tr>
        )
      }
    </React.Fragment>
  );
};

DiscloseRow.propTypes = {
  /** Can be any valid HTML node */
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  rowContents: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default withToggle(toClass(DiscloseRow));
