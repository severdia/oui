import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { isFilterTermInItem } from '../../utils/filter';
import ListItem from './FilterPickerListItem';

/**
 * - Using this instead of isImmutable() because OUI does not have immutable,
 *   only react-immutable-proptypes for propType checking
 *
 * @param {Object|Immutable.Map} itemToCheck
 * - item to evaluate
 * @returns {boolean}
 * - very crude check to detect whether we're dealing with an Immutable Map
 *   or a POJO
 */
function isItemImmutable(itemToCheck) {
  return typeof itemToCheck.size === 'number';
}

/**
 * Based off isItemImmutable, uses the get() for Immutable.Maps or bracket
 * notation for POJO
 * @param {Object|Immutable.Map} pojoOrMap
 * - POJO or Immutable.Map to get key from
 * @param {string} key
 * - top level key to retrieve from POJO or Immutable.Map
 * @returns {*}
 */
function getKeyFromPojoOrImmutableMap(pojoOrMap, key) {
  return isItemImmutable(pojoOrMap) ? pojoOrMap.get(key) : pojoOrMap[key];
}

/**
 *
 * @param {Array} keysToSearch
 * - top level keys in allEntities to join and search for the filterQuery
 * @param {string} filterQuery
 * - value of search input query
 * @param {Function} filterFn
 * - filter function to execute and return from inner function
 * @param {boolean} isCustomFilterFn
 * - determines what arguments are passed to the provided filterFn
 * @returns {Function}
 * - provided an item from an iterable (Object|Immutable.Map), this function
 *   should return a Boolean from the executed filterFn. if isCustomFilterFn
 *   is falsy, the default filter function will be used and only passed
 *   filterQuery and contentToSearch. Otherwise the item argument will
 *   precede filterQuery and contentToSearch
 */
function filterSetup(keysToSearch, filterQuery, filterFn, isCustomFilterFn) {
  return function(item) {
    const contentToSearch = keysToSearch.map((key) => {
      return getKeyFromPojoOrImmutableMap(item, key) || '';
    }).join(' ');
    // If a customFilterFn is used, item should be sent as the first argument
    // before filterQuery and contentToSearch. This is worthwhile since
    // it makes more sense for the component consumer to receive item
    // first in the custom filter function. If not a custom filter function,
    // just send filterQuery and contentToSearch since isFilterTermInItem
    // doesn't need the item argument.
    return filterFn(...((isCustomFilterFn ? [item] : []).concat([filterQuery, contentToSearch])));
  };
}

class FilterPicker extends Component {
  static propTypes = {
    /**
     * Array of Objects or Immutable.List of Immutable.Maps of all entities,
     * including selected ones
     */
    allEntities: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      ImmutablePropTypes.listOf(ImmutablePropTypes.map),
    ]),
    /**
     * Function that should return a child node, passed an object
     * as an argument with the following keys:
     * - availableEntities {Array|Immutable.List}:
     *    The difference of allEntities and entities based on provided
     *    selectedEntityIds. Additionally, filtered via the default filter
     *    function based on the filterQuery value set in handleFilterInput,
     *    or alternatively a provided custom filter function
     * - filterQuery {string}:
     *    Value stored in component state via handleFilterInput
     * - handleFilterInput {Function}:
     *    Function that can be used in an input, that sets the input value
     *    in component state as filterQuery. This can be used for filtering
     *    in the default or custom filter function. If a search Input will
     *    be used with Blocklist and FilterList.ListItem, consider wrapping
     *    Blocklist inside a div with the oui-filter-picker-list class to
     *    remove the Input's bottom border (see story/story source for example)
     * - selectedEntities {Array|Immutable.List}:
     *    Given the optionally provided selectedEntityIds, an array or
     *    Immutable.List of entities, based on ID, from allEntities
     **/
    children: PropTypes.func.isRequired,
    /**
     * Optional function that, if provided, can be used in place of the
     * standard filter function.
     * - Function will receive item, filterQuery, and contentToSearch arguments
     *   from a filter iterable, the last two values may be undefined so some
     *   sane defaults aren't a bad idea
     * - Should return a boolean value, if null is returned by customFilterFn,
     *   the default filter function will be used instead
     * - Example of a customFilterFn that behaves similarly to the default
     *   filter function:
     *    <FilterPicker
     *      customFilterFn={ (item, filterQuery = '', contentToSearch = '') => {
     *          return (
     *            !item.get('archived') &&
     *            contentToSearch.includes(filterQuery);
     *          );
     *      } }>
     */
    customFilterFn: PropTypes.func,
    /**
     * Optional array of top level keys in allEntities to join and search for
     * the filterQuery
     */
    keysToSearch: PropTypes.array,
    /**
     * Optional array or Immutable.List of numbers of selected entity IDs.
     * Do not provide if selected entities shouldn't be filtered
     * from availableEntities
     */
    selectedEntityIds: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      ImmutablePropTypes.listOf(PropTypes.number),
    ]),
    /**
     * String value for the outermost container's
     * data-test-section attribute
     **/
    testSection: PropTypes.string,
  };

  static defaultProps = {
    allEntities: [],
    customFilterFn: () => null,
    keysToSearch: [ 'name', 'description' ],
    selectedEntityIds: [],
    testSection: '',
  };

  state = {
    filterQuery: '',
  };

  handleFilterInput = (event) => {
    this.setState({
      filterQuery: event.target.value,
    });
  };

  render() {
    const { filterQuery } = this.state;
    const {
      allEntities,
      children,
      customFilterFn,
      keysToSearch,
      selectedEntityIds,
      testSection,
    } = this.props;

    const isCustomFilterFn = customFilterFn() !== null;
    const filterFn = isCustomFilterFn ? customFilterFn : isFilterTermInItem;
    const availableEntitiesFilter = filterSetup(keysToSearch, filterQuery, filterFn, isCustomFilterFn);

    const availableEntities = allEntities
      .filter(entity => !selectedEntityIds.includes(getKeyFromPojoOrImmutableMap(entity, 'id')))
      .filter(availableEntitiesFilter);

    const selectedEntities = allEntities.filter(entity => selectedEntityIds.includes(getKeyFromPojoOrImmutableMap(entity, 'id')));

    return (
      <div
        className="oui-filter-picker"
        data-test-section={ testSection }>
        { children({
          handleFilterInput: this.handleFilterInput.bind(this),
          availableEntities,
          filterQuery,
          selectedEntities,
        }) }
      </div>
    );
  }
}

FilterPicker.ListItem = ListItem;

export default FilterPicker;
