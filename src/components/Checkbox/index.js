import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Label from '../Label';

/**
 * Generates a `checkbox` element wrapped in a Label
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const Checkbox = ({
  checked,
  defaultChecked,
  isDisabled,
  label,
  labelWeight,
  onChange,
  testSection,
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
    <Label testSection={ testSection && testSection + '-label' }>
      <div className="flex">
        <input
          data-oui-component={ true }
          type="checkbox"
          defaultChecked={ defaultChecked }
          checked={ checked }
          className={ classes }
          disabled={ isDisabled }
          onChange={ onChange }
          data-test-section={ testSection }
          style={{ 'marginTop': '0.35em' }}
        />
        <div className={ labelClassNames }>
          { label }
        </div>
      </div>
    </Label>
  );
};

Checkbox.propTypes = {
  /** Boolean to set checkbox, for controlled component  */
  checked: PropTypes.bool,
  /** Boolean for how checkbox renders initially  */
  defaultChecked: PropTypes.bool,
  /** Prevents checkbox from being modified and appears disabled */
  isDisabled: PropTypes.bool,
  /** Label that describes the checkbox */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /** Font weight for the label text */
  labelWeight: PropTypes.oneOf(['light', 'normal', 'bold']),
  /** Function that fires when the checkbox is clicked */
  onChange: PropTypes.func,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

Checkbox.defaultProps = {
  labelWeight: 'normal',
};

export default Checkbox;
