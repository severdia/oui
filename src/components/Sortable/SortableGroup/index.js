import classNames from 'classnames';
import Icon from 'react-oui-icons';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import SortableItem from '../SortableItem';
import SortTarget from '../SortTarget';
import types from '../draggableTypes';

/**
 * handleBeginDrag
 * @description Begins drag interaction for the current group
 * @param {Object} props - SortableGroup props
 * @returns {Object} Information passed to sort targets upon drag
 */
function handleBeginDrag(props) {
  const { items, position, id } = props;
  return {
    data: items,
    type: 'group',
    position,
    id,
  };
}

/**
 * handleEndDrag
 * @description Ends drag interaction for the current group
 * @param {Object} props - SortableGroup props
 */
function handleEndDrag(props) {
  props.endDrag();
}

/**
 * isGroupBeingDragged
 * @description Calculates whether the current group is being dragged
 * @param {Object} props - SortableGroup props
 * @param {Object} monitor - Interface to interact with react-dnd state
 * @returns {Boolean} Whether or not the current group is being dragged
 */
function isGroupBeingDragged(props, monitor) {
  return (
    !monitor.didDrop() &&
    monitor.getItem().id === props.id &&
    monitor.getItem().type === 'group'
  );
}

const SortableGroupContainer = ({
  isRootGroup,
  children,
  testSection,
  ...props
}) => (
  isRootGroup ?
    <div data-test-section={ testSection } { ...props }>{ children }</div> :
    <li data-test-section={ testSection } { ...props }>{ children }</li>
);

SortableGroupContainer.propTypes = {
  children: PropTypes.node,
  isRootGroup: PropTypes.bool,
  testSection: PropTypes.string,
};

class SortableGroup extends React.Component {
  static propTypes = {
    baseTestSection: PropTypes.string.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    endDrag: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
    isDragPreview: PropTypes.bool,
    isDragging: PropTypes.bool.isRequired,
    items: PropTypes.instanceOf(Immutable.List).isRequired,
    onMove: PropTypes.func.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    renderItem: PropTypes.func.isRequired,
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

  renderItems = () => {
    const {
      baseTestSection,
      endDrag,
      isDragPreview,
      items,
      onMove,
      position,
      renderItem,
    } = this.props;

    return items.map((item, i) => {
      if (item.get('type') === 'group') {
        return (
          <WrappedGroup
            baseTestSection={ baseTestSection }
            endDrag={ endDrag }
            id={ item.get('id') }
            isDragPreview={ isDragPreview }
            items={ item.get('children') }
            key={ `group-${item.get('id')}` }
            onMove={ onMove }
            position={ [...position, i] }
            renderItem={ renderItem }
          />
        );
      }

      return (
        <SortableItem
          baseTestSection={ baseTestSection }
          endDrag={ endDrag }
          id={ item.get('id') }
          isDragPreview={ isDragPreview }
          item={ item }
          key={ `item-${item.get('id')}` }
          onMove={ onMove }
          position={ [...position, i] }
          render={ renderItem }
        />
      );
    });
  };

  render() {
    const {
      baseTestSection,
      connectDragSource,
      id,
      isDragging,
      isDragPreview,
      onMove,
      position,
    } = this.props;
    const isRootGroup = position.length === 0;

    const trailingTarget = !isRootGroup && (
      <SortTarget
        baseTestSection={ baseTestSection }
        onMove={ onMove }
        ownerId={ id }
        ownerType="group"
        position={ [ ...position.slice(0, -1), position[position.length - 1] + 1 ] }
      />
    );

    const handle = !isRootGroup && connectDragSource(
      <div className="flex flex--column flex-grow--none flex-shrink--none flex-justified--center soft--ends">
        <div
          className="oui-icon oui-sortable__group__handle cursor--move"
          data-test-section={ `${baseTestSection}-handle` }>
          <Icon fill="#c7c7c7" name="ellipsis" />
        </div>
      </div>
    );

    const className = classNames({
      'flex': true,
      'hard--top': isRootGroup,
      'oui-sortable__drag-placeholder': !isDragPreview && isDragging,
      'oui-sortable__group': true,
      'pointer-events--none': !isDragPreview && isDragging,
      'no-border--top': (isDragPreview && isDragging) || isRootGroup,
    });

    const testSectionName = isDragPreview ? 'group-preview' : 'group';
    const testSectionId = position.length > 0 ? position.join('-') : 'root';
    const testSection = `${baseTestSection}-${testSectionName}-${testSectionId}`;

    return (
      <React.Fragment>
        <SortableGroupContainer
          className={ className }
          testSection={ testSection }
          isRootGroup={ isRootGroup }>
          { handle }
          <ul className="flex flex--column width--1-1">
            <SortTarget
              baseTestSection={ baseTestSection }
              onMove={ onMove }
              ownerId={ id }
              ownerType="group"
              position={ [...position, 0] }
            />
            { this.renderItems() }
          </ul>
        </SortableGroupContainer>
        { trailingTarget }
      </React.Fragment>
    );
  }
}

const WrappedGroup = DragSource(
  types.item,
  {
    beginDrag: handleBeginDrag,
    endDrag: handleEndDrag,
    isDragging: isGroupBeingDragged,
  },
  (connect, monitor) => ({
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
  }),
)(SortableGroup);

export default WrappedGroup;
