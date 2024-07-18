import PropTypes from 'prop-types';
import React from 'react';
import { DropTarget } from 'react-dnd';

import types from '../draggableTypes';

/**
 * areArraysEqual
 * @param {Array.<Any>} a - First array to compare
 * @param {Array.<Any>} b - Second array to compare
 * @returns {Boolean} - Whether or not the arrays are equal
 */
function areArraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  return a.reduce((isEqual, itemInA, i) => isEqual && itemInA === b[i], true);
}

/**
 * handleHover
 * @description Adjusts the item order when an item is dragged over this target
 * @param {Object} props - SortTarget props
 * @param {Object} monitor - Interface for accessing react-dnd state
 */
function handleHover(props, monitor) {
  const dragItem = monitor.getItem();
  const { position: currentPosition } = dragItem;
  const { position: nextPosition, onMove, ownerId, ownerType } = props;

  if (!areArraysEqual(currentPosition, nextPosition)) {
    if (
      dragItem.type === 'item' &&
      ownerType === 'item' &&
      dragItem.data.get('id') === ownerId
    ) {
      return;
    }

    if (
      dragItem.type === 'group' && (
        (ownerType === 'group' && dragItem.id === ownerId) ||
        nextPosition.length !== 1
      )
    ) {
      return;
    }

    onMove(currentPosition, nextPosition)
      .then(({ position }) => { dragItem.position = position; });
  }
}

class SortTarget extends React.PureComponent {
  static propTypes = {
    baseTestSection: PropTypes.string.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    ownerId: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    ownerType: PropTypes.oneOf(['item', 'group']).isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  render() {
    const {
      baseTestSection,
      connectDropTarget,
      position,
    } = this.props;

    const testSectionId = position.join('-');
    const testSection = `${baseTestSection}-target-${testSectionId}`;

    return connectDropTarget(
      <li
        className="soft-half--top"
        data-test-section={ testSection }
      />
    );
  }
}

export default DropTarget(
  types.item,
  {
    hover: handleHover,
  },
  (connect, monitor) => ({
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(SortTarget);
