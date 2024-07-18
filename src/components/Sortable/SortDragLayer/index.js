import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { DragLayer } from 'react-dnd';

import SortableGroup from '../SortableGroup';
import SortableItem from '../SortableItem';

/**
 * getItemStyles
 * @description Calculates the CSS X and Y offsets applied to the drag layer
 * @param {Object} initialOffset X and Y coordinates when dragging began
 * @param {Object} currentOffset X and Y coordinates of drag layer now
 * @returns {Object} React CSS object containing X/Y offset style
 */
function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x } = initialOffset;
  const { y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
  };
}

/**
 * onMoveStub
 * @description No-op function to pass to item preview in drag layer
 */
const onMoveStub = () => {};

/**
 * endDragStub
 * @description No-op function to pass to item preview in drag layer
 */
const endDragStub = () => {};

class SortDragLayer extends React.Component {
  static propTypes = {
    baseTestSection: PropTypes.string.isRequired,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
    item: PropTypes.shape({
      data: PropTypes.oneOfType([
        PropTypes.instanceOf(Immutable.Map),
        PropTypes.instanceOf(Immutable.List),
      ]).isRequired,
      id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
      position: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
    renderItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    item: null,
  };

  shouldComponentUpdate(nextProps) {
    const { currentOffset, isDragging } = this.props;

    const hasNewOffset = (
      (currentOffset && currentOffset.y) !== (nextProps.currentOffset && nextProps.currentOffset.y)
    );
    const changedDraggingState = isDragging !== nextProps.isDragging;

    return (hasNewOffset || changedDraggingState);
  }

  render() {
    const {
      baseTestSection,
      currentOffset,
      initialOffset,
      isDragging,
      item,
      renderItem,
    } = this.props;

    return !!item && isDragging && (
      <div
        className="oui-sortable__drag-preview cursor--move height--1-1 width--1-1 pointer-events--none position--fixed"
        data-test-section={ `${baseTestSection}-drag-layer` }>
        <ul
          className="oui-sortable__drag-preview__item"
          style={ getItemStyles(initialOffset, currentOffset) }>
          { item.type === 'item' && (
            <SortableItem
              baseTestSection={ baseTestSection }
              endDrag={ endDragStub }
              id={ item.id }
              isDragPreview={ true }
              item={ item.data }
              key={ item.id }
              onMove={ onMoveStub }
              position={ item.position }
              render={ renderItem }
            />
          ) }
          { item.type === 'group' && (
            <SortableGroup
              baseTestSection={ baseTestSection }
              endDrag={ endDragStub }
              id={ item.id }
              isDragPreview={ true }
              items={ item.data }
              key={ item.id }
              onMove={ onMoveStub }
              position={ item.position }
              renderItem={ renderItem }
            />
          ) }
        </ul>
      </div>
    );
  }
}

export default DragLayer(monitor => ({
  currentOffset: monitor.getSourceClientOffset(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  isDragging: monitor.isDragging(),
}))(SortDragLayer);
