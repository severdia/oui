import classNames from 'classnames';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import SortTarget from '../SortTarget';
import types from '../draggableTypes';

/**
 * handleBeginDrag
 * @description Begins drag interaction for the current item
 * @param {Object} props - SortableItem props
 * @returns {Object} Information passed to item renderer + sort target upon drag
 */
function handleBeginDrag(props) {
  const { item, position, id } = props;
  return {
    data: item,
    id,
    position,
    type: 'item',
  };
}

/**
 * handleEndDrag
 * @description Ends drag interaction for the current item
 * @param {Object} props - SortableItem props
 */
function handleEndDrag(props) {
  props.endDrag();
}

/**
 * isItemBeingDragged
 * @description Calculates whether the current item is being dragged
 * @param {Object} props - SortableItem props
 * @param {Object} monitor - Interface to interact with react-dnd state
 * @returns {Boolean} Whether or not the current item is being dragged
 */
function isItemBeingDragged(props, monitor) {
  return (
    !monitor.didDrop() &&
    monitor.getItem().id === props.id &&
    monitor.getItem().type === 'item'
  );
}

class SortableItem extends React.Component {
  static propTypes = {
    baseTestSection: PropTypes.string.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    endDrag: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    isDragPreview: PropTypes.bool,
    isDragging: PropTypes.bool.isRequired,
    item: PropTypes.instanceOf(Immutable.Map).isRequired,
    onMove: PropTypes.func.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isDragPreview: false,
  };

  componentDidMount() {
    const { connectDragPreview } = this.props;
    connectDragPreview(getEmptyImage(), {
      captureDragState: true,
    });
  }

  render() {
    const {
      baseTestSection,
      connectDragSource,
      isDragging,
      isDragPreview,
      item,
      position,
      onMove,
      render,
    } = this.props;

    const targetPosition = [ ...position.slice(0, -1), position[position.length - 1] + 1 ];

    const className = classNames({
      'oui-sortable__drag-placeholder': !isDragPreview && isDragging,
      'oui-sortable__item': true,
      'pointer-events--none': !isDragPreview && isDragging,
    });

    const renderedItem = render({
      baseTestSection,
      connectDragSource,
      item,
      isDragging,
      isDragPreview,
      position,
    });

    const testSectionName = isDragPreview ? 'item-preview' : 'item';
    const testSectionId = position.join('-');
    const testSection = `${baseTestSection}-${testSectionName}-${testSectionId}`;

    return (
      <React.Fragment>
        <li className={ className } data-test-section={ testSection }>
          { renderedItem }
        </li>
        <SortTarget
          baseTestSection={ baseTestSection }
          onMove={ onMove }
          ownerId={ item.get('id') }
          ownerType="item"
          position={ targetPosition }
        />
      </React.Fragment>
    );
  }
}

export default DragSource(
  types.item,
  {
    beginDrag: handleBeginDrag,
    endDrag: handleEndDrag,
    isDragging: isItemBeingDragged,
  },
  (connect, monitor) => ({
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(SortableItem);


