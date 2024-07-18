import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import { isFilterTermInItem } from '../../utils/filter';
import Input from '../Input';
import BlockList from '../BlockList';
import Suggestion from './Suggestion';


/**
 * Autocomplete
 * This render an input with typeahead functionality
 *
 * Example:
 *  <Autocomplete
 *    placeholder='typehead...'
 *    suggestions={['foo', 'bar']}
 *    onSuggestionClick={ this.handleSuggestionClick }
 *    ActionField={ CustomActionField }
 *  />
 */

class Autocomplete extends Component {

  static defaultProps = {
    autoFillInputValue: false,
    ActionField: (props) => <span { ...props } />,
    InputField: Input,
    SuggestionField: Suggestion,
    debounce: 200,
    filterBy: (x) => x,
    maxHeight: 200,
    onActionClick: () => {},
    onInputChange: () => {},
    onSuggestionClick: () => {},
    placeholder: '',
    stateful: true,
    suggestions: [],
    testSection: '',
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      suggestions: props.suggestions,
      inputValue: props.value,
    };
    if (!props.stateful) {
      this.debouncedOnInputChange = AwesomeDebouncePromise(props.onInputChange, props.debounce);
    }
  }

  /**
   * If stateful query internal suggestions state,
   * else call input change handler
   * @param {String} event - on-change input event
   * @returns {undefined}
   */
  inputChange = (event) => {
    const { onInputChange, stateful } = this.props;
    const query = event.target.value;
    this.setState({
      inputValue: query,
    }, () => {
      const queryCallback = () => onInputChange(query);
      return stateful ? this.querySuggestions(query, queryCallback) : this.debouncedOnInputChange(query);
    });
  }

  /**
   * Updates suggestion state with new query results
   * @param {String} query - suggestion query
   * @param {Function} callback - function that is called have state is set
   * @returns {undefined}
   */
  querySuggestions = (query, callback) => {
    const { filterBy, suggestions } = this.props;
    const nextSuggestions = suggestions.filter((suggestion) => isFilterTermInItem(query, filterBy(suggestion)));

    this.setState({
      suggestions: nextSuggestions,
    }, callback);
  }

  /**
   * Creates an event handler for setting the focus state
   * @param {Boolean} isFocused - set the isFocus state to true or false
   * @returns {Function} focus/blur event handler
   */
  createFocusHandler = (isFocused) => () => {
    this.setState({ isFocused });
  }

  /**
   * Creates an event handler that is called when a suggestion is clicked
   * @param {*} suggestion - a single suggestion item
   * @returns {Function} mousedown event handler
   */
  createSuggestionClickHandler = (suggestion) => () => {
    const { filterBy, onSuggestionClick, autoFillInputValue } = this.props;
    if (autoFillInputValue) {
      this.setState({
        inputValue: filterBy(suggestion),
      });
    }

    onSuggestionClick(suggestion);
  }

  render() {
    const {
      isFocused,
      inputValue,
    } = this.state;

    const {
      ActionField,
      InputField,
      SuggestionField,
      maxHeight,
      onActionClick,
      placeholder,
      stateful,
      testSection,
    } = this.props;

    const { suggestions } = stateful ? this.state : this.props;

    const numberOfSuggestions = suggestions.size ? suggestions.size : suggestions.length;
    return (
      <div data-oui-component={ true }>
        <InputField
          type='text'
          placeholder={ placeholder }
          onFocus={ this.createFocusHandler(true) }
          onBlur={ this.createFocusHandler(false) }
          onChange={ this.inputChange }
          testSection={ `${testSection}-input` }
          value={ inputValue }
        />
        {
          isFocused && numberOfSuggestions > 0 && (
            <BlockList maxHeight={ maxHeight }>
              <BlockList.Category testSection={ `${testSection}-suggestions` }>
                {
                  onActionClick && (
                    <BlockList.Item
                      key='action-suggestion'
                      onMouseDown={ onActionClick }
                      testSection={ `${testSection}-action` }>
                      <ActionField />
                    </BlockList.Item>
                  )
                }
                {
                  suggestions.map((suggestion, i) => (
                    <BlockList.Item
                      key={ `suggestion-${i}` }
                      onMouseDown={ this.createSuggestionClickHandler(suggestion) }
                      testSection={ `${testSection}-block-item` }>
                      <SuggestionField
                        suggestion={ suggestion }
                        testSection={ `${testSection}-suggestion` }
                      />
                    </BlockList.Item>
                  ))
                }
              </BlockList.Category>
            </BlockList>
          )
        }
      </div>
    );
  }
}

Autocomplete.propTypes = {
  /** React component that renders an action field */
  ActionField: PropTypes.func,
  /**
    * If true, when suggestion is selected, input value is
    * updated to suggestion value
    */
  InputField: PropTypes.func,
  /** React component that renders an input field */
  SuggestionField: PropTypes.func,
  /** React component that renders a suggestion field */
  autoFillInputValue: PropTypes.bool,
  /** Sets the debounce time (ms) */
  debounce: PropTypes.number,
  /**
   * Function that takes a single suggestion
   * and returns a value for a query to match
   */
  filterBy: PropTypes.func,
  /** Sets the maximum height of the suggestions list */
  maxHeight: PropTypes.number,
  /** Function that is called when the action field is clicked */
  onActionClick: PropTypes.func,
  /** Function that is called when the input field changes its value */
  onInputChange: PropTypes.func,
  /** Function that is called when a suggestion is clicked */
  onSuggestionClick: PropTypes.func,
  /** Placeholder text of input field */
  placeholder: PropTypes.string,
  /** Determines if the list of suggestions should be managed internally  */
  stateful: PropTypes.bool,
  /**
   * List of suggestions
   * TODO: make suggestions an instance of Immutable.List
   */
  suggestions: PropTypes.array,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** Default Input value */
  value: PropTypes.string,
};

export default Autocomplete;
