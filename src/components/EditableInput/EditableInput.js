import React, { Component } from 'react';
import noop from 'lodash.noop';
import PropTypes from 'prop-types';

import Input from '../Input';

class EditableInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: props.isEditing,
    };
  }

  blur = () => {
    this.setState({ isEditing: false });
    this.props.onBlur();
  }

  focus = () => {
    this.setState({ isEditing: true });
    this.props.onFocus();
  }

  render() {
    const {
      displayError,
      note,
      label,
      onChange,
      placeholder,
      testSection,
      type,
      value,
    } = this.props;

    const { isEditing } = this.state;

    return (
      <div data-oui-component={ true }>
        {
          isEditing ?
            (
              <Input
                focus={ true }
                displayError={ displayError }
                label={ label }
                note={ note }
                onFocus={ this.focus }
                onBlur={ this.blur }
                onChange={ onChange }
                placeholder={ placeholder }
                type={ type }
                value={ value }
              />
            )
            : (
              <div
                data-test-section={ testSection }
                className='cursor--pointer editable soft-half'
                onClick={ this.focus }>
                { value }
              </div>
            )
        }
      </div>
    );
  }
}

EditableInput.defaultProps = {
  displayError: false,
  isEditing: false,
  label: '',
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  placeholder: '',
  value: '',
};

EditableInput.propTypes = {
  /** Toggle error state styles  */
  displayError: PropTypes.bool,
  /** Determines if the component is in edit mode */
  isEditing: PropTypes.bool,
  /** Text that describes the input */
  label: PropTypes.string,
  /** Append note near form input. */
  note: PropTypes.string,
  /** Function that fires when the input goes out of focus */
  onBlur: PropTypes.func,
  /** Function that fires when the input loses focus after the value changes */
  onChange: PropTypes.func,
  /** Function that fires when the input is focused */
  onFocus: PropTypes.func,
  /** Placeholder for input */
  placeholder: PropTypes.string,
  /** Used for data-test-section attribute on the link */
  testSection: PropTypes.string,
  /** Supported input types */
  type: PropTypes.oneOf([
    'text',
    'password',
    'date',
    'number',
    'percent',
    'email',
    'url',
    'search',
    'tel',
  ]).isRequired,
  /** Text within the input */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default EditableInput;
