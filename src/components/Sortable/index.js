import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SortDragLayer from './SortDragLayer';
import SortableGroup from './SortableGroup';

/**
 * getKeypathFromPosition
 * @description Converts an index-based keypath to be Immutable-compatible
 * @param {Array.<Number>} position Array of indeces pointing to item/group
 * @returns {Array.<Number|String>} Keypath pointing to item/group data in state
 */
function getKeypathFromPosition(position) {
  // Insert 'children' in between each index in position
  return position.reduce(
    (currentKeypath, currentIndex, currentDepth) => {
      if (currentDepth === position.length - 1) {
        return [...currentKeypath, currentIndex];
      }
      return [...currentKeypath, currentIndex, 'children'];
    },
    [],
  );
}

/**
 * removeItem
 * @description Removes item at position and returns resulting item list
 * @param {Array.<Number>} position Array of indeces pointing to item
 * @param {Immutable.List} items List of items in Sortable component
 * @returns {Immutable.List} List of items without item at given position
 */
function removeItem(position, items) {
  const keypathToItem = getKeypathFromPosition(position);

  let updatedItems = items;
  updatedItems = updatedItems.removeIn(keypathToItem);

  return updatedItems;
}

/**
 * insertItem
 * @description Inserts item at position and returns resulting item list
 * @param {Array.<Number>} position Array of indeces pointing to item
 * @param {Immutable.List} items List of items in Sortable component
 * @param {Immutable.Map} newItem New item to insert into Sortable component
 * @returns {Immutable.List} List of items including new item at given position
 */
function insertItem(position, items, newItem) {
  const keypathToItem = getKeypathFromPosition(position);

  let updatedItems = items;
  updatedItems = updatedItems.updateIn(
    keypathToItem.slice(0, -1),
    (list) => list.splice(keypathToItem.slice(-1), 0, newItem),
  );

  return updatedItems;
}

/**
 * getRealNextPosition
 * @description Adjust next position when item is removed and added during drag
 * @param {Array.<Number>} prev Array of indeces pointing prev item position
 * @param {Array.<Number>} next Array of indeces pointing next item position
 * @returns {Array.<Number>} Array of corrected indeces pointing next position
 */
function getRealNextPosition(prev, next) {
  /**
   * Account for removal of item at original position when dragging downward or
   * into a group by decrementing affected indeces in the next position array
   */
  if (prev.length <= next.length) {
    return next.map((nextIndex, i) => {
      return nextIndex > prev[i] ? nextIndex - 1 : nextIndex;
    });
  }

  return next;
}

/**
 * enforceGrouping
 * @description Ensures all items exist within a sortable group
 * @param {Immutable.List} items List of items in Sortable component
 * @param {Function} generateGroupId Creates a new unique group key
 * @returns {Immutable.List} Items wrapped in groups at top level
 */
function enforceGrouping(items, generateGroupId) {
  /**
   * Ensure that all top-level drag items in the sortable list are groups and
   * move all top-level items into groups.
   */
  return items.map((item) => {
    // If a group exists but has not been formatted yet, format it
    if (Immutable.List.isList(item)) {
      return Immutable.fromJS({
        type: 'group',
        children: item,
        id: generateGroupId(),
      });
    }

    // If a group already exists, pass the group through
    if (item.get('type') === 'group') {
      return item;
    }

    // If the item is a standalone ungrouped item, place it in a group
    return Immutable.fromJS({
      type: 'group',
      children: [item],
      id: generateGroupId(),
    });
  });
}

/**
 * prohibitGrouping
 * @description Ensures all items exist at the top level (not grouped)
 * @param {Immutable.List} items List of items in Sortable component
 * @returns {Immutable.List} Items extracted from all grouping levels
 */
function prohibitGrouping(items) {
  return items.reduce((updatedItems, currentItem) => {
    // If a group exists and is unformatted, extract any items from it
    if (Immutable.List.isList(currentItem)) {
      return updatedItems.concat(currentItem);
    }

    // If an item exists, pass the item through
    if (currentItem.get('type') === 'item') {
      return updatedItems.push(currentItem);
    }

    // If a group exists and is formatted, extract any items from it
    if (
      currentItem.get('type') === 'group' &&
      currentItem.has('children') &&
      currentItem.get('children').size > 0
    ) {
      return updatedItems.concat(currentItem.get('children'));
    }

    return updatedItems;
  }, Immutable.List());
}

/**
 * formatItemsForOutput
 * @description Removes internal group data from items before passing items
 *              to the consumer
 * @param {Immutable.List} items Items to format
 * @returns {Immutable.List} The formatted items list
 */
function formatItemsForOutput(items) {
  return items.map(
    (item) => item.get('type') === 'group' ? item.get('children') : item,
  );
}

class Sortable extends React.Component {
  static propTypes = {
    /** Whether or not to force items into groups */
    allowGrouping: PropTypes.bool,
    /**
     * Initial value of the <Sortable /> component. List of items and groups.
     * Can either be an Immutable.List or a JS array containing Immutable.Maps
     * or JS objects for items/groups, respectively.
     *
     * Default value format: [ <groups or items> ]
     * Item format: { type: 'item', id: 1, text: 'Hello' }
     * Group format: [ <items only> ]
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({
            id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
            type: PropTypes.oneOf(['item']).isRequired,
            children: PropTypes.array,
            text: PropTypes.string,
          }),
          PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
              type: PropTypes.oneOf(['item']).isRequired,
              children: PropTypes.array,
              text: PropTypes.string,
            }),
          ),
        ]),
      ),
      PropTypes.instanceOf(Immutable.List),
    ]).isRequired,
    /**
     * Handler that is called when a drag interaction ends. This function
     * receives the Immutable.List value of the drag and drop component as
     * an argument.
     */
    onChange: PropTypes.func,
    /**
     * Function for rendering custom components in the drag-and-drop context.
     * This function will receive one object argument with the following
     * properties:
     *
     * - baseTestSection (String): Test section name passed to <Sortable />
     * - connectDragSource (Function): Wrap your item component with
     *                                 this function to make it draggable
     * - item (Immutable.Map): Contains item data (id, text)
     * - isDragPreview (Boolean): Whether the current item is a preview
     * - isDragging (Boolean): Whether the current item is being dragged
     * - position (Array<Number>): Indeces representing the nested item position
     */
    renderItem: PropTypes.func.isRequired,
    /** Test section name */
    testSection: PropTypes.string,
  };

  static defaultProps = {
    allowGrouping: false,
    onChange: () => {},
    testSection: 'sortable',
  };

  constructor(props) {
    super(props);

    const { allowGrouping, defaultValue: items } = this.props;

    const coercedItems = Immutable.List.isList(items) ?
      items :
      Immutable.fromJS(items);

    this.groupKeyCounter = 0;

    this.state = {
      items: allowGrouping ?
        enforceGrouping(coercedItems, this.generateGroupId) : prohibitGrouping(coercedItems),
    };
  }

  componentDidUpdate({ allowGrouping: prevAllowGrouping }) {
    const { allowGrouping: currentAllowGrouping } = this.props;
    const { items } = this.state;

    if (prevAllowGrouping && !currentAllowGrouping) {
      this.setState({
        items: prohibitGrouping(items),
      });
    } else if (!prevAllowGrouping && currentAllowGrouping) {
      this.setState({
        items: enforceGrouping(items, this.generateGroupId),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !nextState.items.equals(this.state.items) ||
      nextProps.allowGrouping !== this.props.allowGrouping
    );
  }

  generateGroupId = () => {
    const result = this.groupKeyCounter;
    this.groupKeyCounter += 1;
    return result;
  }

  moveItem = (currentPosition, nextPosition) => {
    const currentItemKeypath = getKeypathFromPosition(currentPosition);
    const currentItem = this.state.items.getIn(currentItemKeypath);
    const realNextPosition = getRealNextPosition(currentPosition, nextPosition);
    let updatedItems = this.state.items;

    // Move the item at the current position to the next position in the state
    updatedItems = removeItem(currentPosition, updatedItems);
    updatedItems = insertItem(realNextPosition, updatedItems, currentItem);

    this.setState({
      items: updatedItems,
    });

    return Promise.resolve({ position: realNextPosition });
  };

  endDrag = () => {
    const { allowGrouping, onChange } = this.props;
    let { items } = this.state;

    // After dragging is complete, remove all empty top-level groups
    let updatedItems = items;
    updatedItems = updatedItems.filter((item) => {
      return item.get('type') !== 'group' || item.get('children').size > 0;
    });

    if (allowGrouping) {
      updatedItems = enforceGrouping(updatedItems, this.generateGroupId);
    }

    this.setState({ items: updatedItems });

    onChange(
      formatItemsForOutput(updatedItems)
    );
  }

  render() {
    const { renderItem, testSection } = this.props;
    const { items } = this.state;

    return (
      <div className="oui-sortable" data-test-section={ testSection }>
        <SortableGroup
          items={ items }
          onMove={ this.moveItem }
          endDrag={ this.endDrag }
          position={ [] }
          renderItem={ renderItem }
          baseTestSection={ testSection }
          id="root"
        />
        <SortDragLayer
          renderItem={ renderItem }
          baseTestSection={ testSection }
        />
      </div>
    );
  }
}

/**
 * Please note: in order to test this component with Enzyme, this component must
 * by wrapped in a test version of HTML5Backend. Therefore, an unwrapped version
 * of this component must be accessible to unit test files.
 */
export const UnwrappedSortable = Sortable;

export default DragDropContext(HTML5Backend)(Sortable);
