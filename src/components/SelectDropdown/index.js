import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Button from '../Button';
import Dropdown from '../Dropdown';

class SelectDropdown extends React.Component {
  static propTypes = {
    /**
     * Style value that is passed to the OUI button that controls the dropdown.
     */
    buttonStyle: PropTypes.string,
    /**
     * Show error by default.
     */
    displayError: PropTypes.bool,
    /**
     * Dropdown direction.
     */
    dropdownDirection: PropTypes.oneOf(['right', 'left']),
    /**
     * An initial value for the dropdown before anything is selected
     */
    initialPlaceholder: PropTypes.node,
    /**
     * The select is greyed out if it is disabled.
     */
    isDisabled: PropTypes.bool,
    /**
     * Dropdown items that can be selected from the select dropdown.
     */
    items: PropTypes.arrayOf(PropTypes.shape({
      activatorLabel: PropTypes.node,
      description: PropTypes.string,
      label: PropTypes.node.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]).isRequired,
    })).isRequired,
    /**
     * The minimum width of the dropdown list; any valid CSS width value.
     */
    minDropdownWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Function that is called when user selects
     * an item from dropdown list.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Identifier used to create data-test-section attributes for testing.
     */
    testSection: PropTypes.string,
    /**
     * Identifier used to create data-track-id attributes for Heap testing.
     */
    trackId: PropTypes.string,
    /**
     * Value of currently selected item.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    /**
     * Width of the activator container.
     */
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * zIndex of dropdown group
     */
    zIndex: PropTypes.number,
  };

  static defaultProps = {
    buttonStyle: 'outline',
    initialPlaceholder: '',
    displayError: false,
    dropdownDirection: 'right',
    width: '100%',
    trackId: '',
    testSection: '',
    value: '',
  };

  renderContents = () => {
    const { items, value, minDropdownWidth, dropdownDirection } = this.props;

    return (
      <Dropdown.Contents minWidth={ minDropdownWidth } direction={ dropdownDirection }>
        { items.map((entry, index) => (
          <SelectOption
            key={ index }
            onChange={ this.props.onChange }
            value={ entry.value }
            label={ entry.label }
            description={ entry.description }
            isSelected={ entry.value === value }
          />
        ))}
      </Dropdown.Contents>
    );
  };

  render() {
    const { buttonStyle, value, width, zIndex, isDisabled, initialPlaceholder } = this.props;
    let selectedItem;
    this.props.items.forEach(item => {
      if (item.value === value) {
        selectedItem = item;
      }
    });

    const outerClass = classNames(
      {['oui-form-bad-news']: this.props.displayError}
    );

    let activatorLabel = '';
    if (selectedItem) {
      activatorLabel = selectedItem.activatorLabel || selectedItem.label;
    } else if (initialPlaceholder) {
      activatorLabel = initialPlaceholder;
    }

    const Activator = ({ buttonRef, onClick, onBlur }) => (
      <div
        style={{ width: width}}
        className={ outerClass }>
        <Button
          isDisabled={ this.props.isDisabled }
          style={ buttonStyle }
          testSection={ this.props.testSection }
          width="full"
          buttonRef={ buttonRef }
          onClick={ onClick }
          onBlur={ onBlur }>
          <div className="flex flex-align--center" data-track-id={ this.props.trackId }>
            <span style={{overflow: 'hidden'}} className="flex flex--1">{ activatorLabel }</span>
            <span className="push--left oui-arrow-inline--down" />
          </div>
        </Button>
      </div>
    );

    return (
      <Dropdown
        { ...(zIndex ? { zIndex } : {}) }
        isDisabled={ isDisabled }
        activator={ <Activator /> }>
        { this.renderContents() }
      </Dropdown>
    );
  }
}

class SelectOption extends React.Component {
  static propTypes = {
    /**
     * Description of select item.
     */
    description: PropTypes.string,
    /** Toggle dropdown open/closed */
    handleToggle: PropTypes.func,
    /**
     * Whether or not item has been selected or not.
     */
    isSelected: PropTypes.bool.isRequired,
    /**
     * Label of select item.
     */
    label: PropTypes.node.isRequired,
    /**
     * Function that is called when user selects another item.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Value of select item.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
  };

  onClick = () => {
    this.props.onChange(this.props.value);
  };

  render() {
    const { isSelected, label, description, value, handleToggle } = this.props;
    return (
      <Dropdown.ListItem hideOnClick={ true } handleToggle={ handleToggle }>
        <Dropdown.BlockLink
          isLink={ !isSelected }
          onClick={ this.onClick }
          testSection={ 'dropdown-block-link-' + value }>
          { label }
          { description && (
            <div className="micro muted">
              { description }
            </div>
          )}
        </Dropdown.BlockLink>
      </Dropdown.ListItem>
    );
  }
}

SelectOption.defaultProps = {
  description: '',
  handleToggle: () => {},
};

export default SelectDropdown;
