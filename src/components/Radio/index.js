import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import Label from '../Label';

/**
 * Generates a `input` element of type `radio` that is wrapped in a `Label`.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const Radio = ({
  isDisabled,
  testSection = null,
  name,
  defaultChecked,
  checked,
  onChange,
  label,
  labelWeight,
}) => {
  const labelClassNames = classNames({
    'flush--bottom': true,
    'push--left': true,
    'weight--light': labelWeight === 'light',
    'weight--normal': labelWeight === 'normal',
    'weight--bold': labelWeight === 'bold',
    'cursor--pointer': true,
    'oui-label--disabled': isDisabled,
  });

  const classes = classNames({
    'flex--none': true,
  });

  return (
    <Label data-test-section={ `${testSection}-label` }>
      <div className="flex">
        <input
          data-oui-component={ true }
          type="radio"
          name={ name }
          defaultChecked={ defaultChecked }
          checked={ checked }
          className={ classes }
          disabled={ isDisabled }
          onChange={ onChange }
          data-test-section={ testSection }
          style={{ 'marginTop': '0.3em' }}
        />
        <div className={ labelClassNames }>
          { label }
        </div>
      </div>
    </Label>
  );
};

Radio.propTypes = {
  /** Boolean to set radio input, for controlled component  */
  checked: PropTypes.bool,
  /** Boolean for how radio input renders initially  */
  defaultChecked: PropTypes.bool,
  /** Prevents radio input from being modified and appears disabled */
  isDisabled: PropTypes.bool,
  /** Text that describes the radio input */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /** Font weight for the label text */
  labelWeight: PropTypes.oneOf(['light', 'normal', 'bold']),
  /**
    String that can be used to identify a set of radio inputs so that only one
    in the set is checked at any given time.
  */
  name: PropTypes.string.isRequired,
  /** Function that fires when the radio input is clicked */
  onChange: PropTypes.func,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

Radio.defaultProps = {
  labelWeight: 'normal',
};

export default Radio;
