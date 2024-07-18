import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import ButtonRow from '../ButtonRow';

/**
 * Pagination
 *
 * Example:
 *  <Pagination
 *    currentPage={ 1 }
 *    onChange={ this.handlPageChange }
 *    totalPage={ 123 }
 *  />
 */

class Pagination extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    testSection: '',
  };

  createPageChangeHandler = (nextPage) => {
    return () => {
      const { onChange } = this.props;
      onChange(nextPage);
    };
  }

  render() {
    const { currentPage, totalPages, testSection } = this.props;
    return (
      <ButtonRow
        testSection={ testSection }
        centerGroup={ [
          <Button
            key="1"
            style="outline"
            width="default"
            onClick={ this.createPageChangeHandler(1) }
            isDisabled={ currentPage === 1 }>
            First
          </Button>,
          <Button
            key="2"
            style="outline"
            width="default"
            onClick={ this.createPageChangeHandler(currentPage - 1) }
            isDisabled={ currentPage <= 1 }>
            Back
          </Button>,
          <span key="pagenums" className="soft--sides">&nbsp;Page { currentPage } of { totalPages }&nbsp;</span>,
          <Button
            key="3"
            style="outline"
            width="default"
            onClick={ this.createPageChangeHandler(currentPage + 1) }
            isDisabled={ currentPage >= totalPages }>
            Next
          </Button>,
          <Button
            key="4"
            style="outline"
            width="default"
            onClick={ this.createPageChangeHandler(totalPages) }
            isDisabled={ currentPage === totalPages }>
            Last
          </Button>,
        ] }
      />
    );
  }
}

Pagination.propTypes = {
  /** Sets the current page number */
  currentPage: PropTypes.number.isRequired,
  /** Function that is called when a pagination Button is clicked */
  onChange: PropTypes.func,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** Sets the total number of pages */
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
