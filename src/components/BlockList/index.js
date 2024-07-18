import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Category from './Category';
import Item from './Item';

/**
 * Building blocks to display a list of items that perform actions.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const BlockList = ({
  hasBorder = true,
  testSection,
  maxHeight,
  children,
}) => {
  const classes = classNames({
    'background--white': true,
    'overflow-x--auto': true,
    'border--all': hasBorder,
  });

  return (
    <div
      data-oui-component={ true }
      className={ classes }
      data-test-section={ testSection }
      style={{ maxHeight: maxHeight }}>
      <ul style={{ display: 'inline-block', minWidth: '100%' }}>
        { children }
      </ul>
    </div>
  );
};

BlockList.propTypes = {
  /** Should be subcomponents of `BlockList` */
  children: PropTypes.node.isRequired,
  /** Should the `BlockList` contain a border on all sides */
  hasBorder: PropTypes.bool,
  /**
   * The max height of the `BlockList`. Pixels will be assumed if no unit is
   * provided.
   */
  maxHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

BlockList.Category = Category;
BlockList.Item = Item;

export default BlockList;
