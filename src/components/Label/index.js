import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wraps text or HTML in a `label` element. Often used to label inputs.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const Label = ({
  isOptional,
  isRequired,
  children,
  testSection,
  inputId,
}) => {
  let classes = null;
  let fieldLabel = null;

  if (isRequired) {
    fieldLabel = <span className="oui-label--required"></span>;
  } else if (isOptional) {
    fieldLabel = <span className="oui-label__optional">(Optional)</span>;
  }

  if (typeof children === 'string') {
    classes = 'oui-label';
  }

  return (
    <label
      data-oui-component={ true }
      className={ classes }
      data-test-section={ testSection }
      htmlFor={ inputId }>
      { children }
      { fieldLabel }
    </label>
  );
};

Label.propTypes = {
  /** What the label describes */
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]),
  /** Id of the input to properly associate with this label */
  inputId: PropTypes.string,
  /** Includes optional label if true */
  isOptional: PropTypes.bool,
  /** Includes required asterisk label if true */
  isRequired: PropTypes.bool,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default Label;
