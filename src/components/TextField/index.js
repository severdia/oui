/**
 * DEPERCATION NOTICE: TextField is no longer being maintained,
 * use Input component instead.
 */

import React from 'react';
import Label from '../Label';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Generates an `input` element (optionally wrapped in a label) and accepts
 * most of the common input types.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const TextField = ({
  note = false,
  defaultValue,
  displayError = false,
  isDisabled = false,
  isFilter = false,
  isOptional,
  isReadOnly,
  onBlur,
  isRequired,
  label,
  min,
  max,
  onChange,
  onInput,
  onKeyDown,
  onFocus,
  placeholder,
  testSection,
  type,
  value,
}) => {

  let wrapperClasses = classnames(
    {'oui-form-bad-news': displayError}
  );

  const inputClassNames = classnames(
    'oui-text-input',
    {
      'oui-text-input--search': isFilter,
      'text--right': (type === 'number' || type === 'percent'),
    }
  );

  let inputType = type;
  if (type === 'percent') {
    inputType = 'number';
    // min must be less than max, and both must be within 0 - 100.
    // Otherwise, ignore and set to default
    const oldMin = min;
    min = (!min || min < 0 || min > 100 || min > max) ? 0 : min;
    max = (!max || max < 0 || max > 100 || max < oldMin) ? 100 : max;
  }

  return (
    /* eslint-disable react/jsx-no-bind */
    <div
      data-oui-component={ true }
      className={ wrapperClasses ? 'oui-form-bad-news' : null }>
      { label &&
        <Label
          displayError={ displayError }
          isRequired={ isRequired }
          isOptional={ isOptional }>
          { label }
        </Label>
      }
      <span className="flex flex-align--center">
        <input
          className={ inputClassNames }
          type={ inputType }
          value={ value }
          defaultValue={ defaultValue }
          placeholder={ placeholder }
          required={ isRequired }
          readOnly={ isReadOnly }
          disabled={ isDisabled }
          onInput={ onInput }
          onChange={ onChange }
          onBlur={ onBlur }
          onKeyDown={ onKeyDown }
          onFocus={ onFocus }
          min={ min }
          max={ max }
          data-test-section={ testSection }
        />
        { type === 'percent' && <span className="push-half--left push--right">%</span> }
      </span>
      { note && <div className="oui-form-note">{ note }</div> }
    </div>
  );
};

TextField.propTypes = {
  /** The default value of the input used on initial render */
  defaultValue: PropTypes.string,
  /** Toggle error state styles  */
  displayError: PropTypes.bool,
  /** Prevents input from being modified and appears disabled */
  isDisabled: PropTypes.bool,
  /** Includes error if true */
  isFilter: PropTypes.bool,
  /** Adds an optional label if there is a label provided
   *  @param {Object} props Object of props
   *  @returns {Error} Error or null
   */
  isOptional: PropTypes.bool,
  /** Prevents input from being modified but doesn't appear disabled */
  isReadOnly: PropTypes.bool,
  /** Prevents input from being submitted without value */
  isRequired: PropTypes.bool,
  /** Text that describes the input */
  label: PropTypes.string,
  /**
   * Max value for the `input`. Should be used only when `type` is `number`.
   */
  max: PropTypes.number,
  /**
   * Min value for the `input`. Should be used only when `type` is `number`.
   */
  min: PropTypes.number,
  /** Append note near form input. */
  note: PropTypes.string,
  /**
   * Function that fires when the input loses focus. It fires regardless of
   * whether the value has changed.
  */
  onBlur: PropTypes.func,
  /** Function that fires when the input loses focus after the value changes */
  onChange: PropTypes.func,
  /** Function that fires when the input gains focus */
  onFocus: PropTypes.func,
  /** Function that fires on keypress */
  onInput: PropTypes.func,
  /** Function that fires when a key is pressed down */
  onKeyDown: PropTypes.func,
  /** Input placeholder text */
  placeholder: PropTypes.string,
  /** Hook for automated JavaScript tests */
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

export default TextField;
