import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Switch = (props) => {
  const {
    onClick,
    elementId = 'switch1',
    checked,
    isDisabled,
    testSection,
  } = props;

  const switchClasses = classnames({
    'oui-switch': true,
    'oui-switch--disabled': isDisabled,
  });

  return (
    <div
      className='position--relative'
      data-oui-component={ true }
      data-test-section={ testSection }>
      <input
        type="checkbox"
        id={ elementId }
        className={ switchClasses }
        checked={ checked }
        onClick={ onClick }
        disabled={ isDisabled }
      />
      <label
        htmlFor={ elementId }
        data-on-label="On"
        data-off-label="Off"></label>
    </div>
  );
};

Switch.propTypes = {
  // checked true means the switch is on; false is off
  checked: PropTypes.bool,
  // string for label/input id pair, should be unique to the page
  elementId: PropTypes.string,
  /** Whether it is disabled, will render greyscale if so **/
  isDisabled: PropTypes.bool,
  // onClick function
  onClick: PropTypes.func,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default Switch;
