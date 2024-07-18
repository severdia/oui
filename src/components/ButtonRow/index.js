import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const areAnyButtonsFullWidth = (buttons) => {
  let includesFullWidth = false;

  buttons.map((button) => {
    if (button.props && button.props.width === 'full') {
      includesFullWidth = true;
    }
  });

  return includesFullWidth;
};

const ButtonRowSide = (side, buttons, testSection) => {
  const includesFullWidthButton = areAnyButtonsFullWidth(buttons);
  const wrapperClassNames = classNames({
    'flex': includesFullWidthButton,
    'flex--1': true,
    [`oui-button-row--${side}`]: side,
  });

  return (
    <div
      data-oui-component={ true }
      className={ wrapperClassNames }
      data-test-section={ testSection ? testSection + '-' + side : null }>
      { buttons.map((button, index) => {
        if (includesFullWidthButton) {
          // `ButtonRow` groups that contain a full width `Button` must wrap
          // the buttons in `div`'s of equal spacing.
          const containerClasses = classNames({
            'push-half--right': index !== (buttons.length - 1),
            'push-half--left': index !== 0,
            'flex--1': true,
          });

          return (
            <div
              className={ containerClasses }
              key={ index }>
              { button }
            </div>
          );
        }
        return button;
      }) }
    </div>
  );
};

/**
 * A horizontal list of buttons with space between them.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const ButtonRow = ({
  centerGroup,
  leftGroup,
  rightGroup,
  testSection,
}) => {
  return (
    <div
      data-oui-component={ true }
      className='oui-button-row flex'
      data-test-section={ testSection }>
      { leftGroup ? ButtonRowSide('left', leftGroup, testSection) : null }
      { centerGroup ? ButtonRowSide('center', centerGroup, testSection) : null }
      { rightGroup ? ButtonRowSide('right', rightGroup, testSection) : null }
    </div>
  );
};

ButtonRow.propTypes = {
  /** Array of buttons for the center */
  centerGroup: PropTypes.arrayOf(PropTypes.element),
  /** Array of buttons for left side */
  leftGroup: PropTypes.arrayOf(PropTypes.element),
  /** Array of buttons for right side */
  rightGroup: PropTypes.arrayOf(PropTypes.element),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default ButtonRow;
