import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from '../Spinner';

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const Button = ({
  ariaLabel,
  isSubmit,
  isLink,
  children,
  isActive,
  isDisabled,
  isLoading,
  loadingText,
  onBlur,
  onClick,
  onMouseDown,
  size,
  style,
  testSection,
  width = 'default',
  buttonRef,
}) => {

  const buttonClassNames = classNames(
    'oui-button', {
      [`oui-button--${style}`]: style,
      [`oui-button--${size}`]: size,
      [`oui-button--${width}`]: width,
      'is-active': isActive,
      'oui-button--loading': isLoading,
    });

  const type = isSubmit ? 'submit' : 'button';

  function handleOnClick(event) {
    if (isDisabled || isLoading) {
      return;
    }
    onClick(event);
  }

  if (isLink) {
    return (
      <div
        data-oui-component={ true }
        className={ buttonClassNames }
        disabled={ isDisabled }
        onBlur={ onBlur }
        data-test-section={ testSection }
        ref={ buttonRef }>
        { children }
      </div>
    );
  }

  return (
    <button
      data-oui-component={ true }
      className={ buttonClassNames }
      disabled={ isDisabled || isLoading }
      type={ type }
      onBlur={ onBlur }
      onClick={ handleOnClick }
      onMouseDown={ onMouseDown }
      data-test-section={ testSection }
      aria-label={ ariaLabel }
      aria-live="polite"
      ref={ buttonRef }>
      { isLoading && <Spinner data-test-section="button-spinner" size="tiny"/> }
      { isLoading ? loadingText || 'Processing' : children }
    </button>
  );
};

Button.propTypes = {
  /** Describes buttons that have an icon but no text */
  ariaLabel: PropTypes.string,
  /** React ref to the underlying button component */
  buttonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /** Text within the button */
  children: PropTypes.node.isRequired,
  /** Render button with active state */
  isActive: PropTypes.bool,
  /** Prevent users from interacting with the button */
  isDisabled: PropTypes.bool,
  /** Changes the button to a div for insertion within a Link component */
  isLink: PropTypes.bool,
  /** When true, adds a spinner to the button and disables the button */
  isLoading: PropTypes.bool,
  /** Make the button act as a submit button */
  isSubmit: PropTypes.bool,
  /** When the button adds a spinner, it displays this text */
  loadingText: PropTypes.string,
  /** Function that fires when the button loses focus */
  onBlur: PropTypes.func,
  /** Function that fires when the button is clicked on */
  onClick: PropTypes.func,
  /** Function that fires when the button is mouse downed */
  onMouseDown: PropTypes.func,
  /** Various height and width options */
  size: PropTypes.oneOf([
    'tiny',
    'small',
    'large',
    'narrow',
    'tight',
  ]),
  /** Various color options */
  style: PropTypes.oneOf([
    'highlight',
    'danger',
    'danger-outline',
    'outline',
    'outline-reverse',
    'plain',
    'toggle',
    'underline',
    'unstyled',
  ]),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** Various height and width options */
  width: PropTypes.oneOf([
    'default',
    'full',
  ]),
};

Button.defaultProps = {
  isLink: false,
  isLoading: false,
  isDisabled: false,
  isSubmit: false,
  loadingText: '',
  onBlur: () => {},
  onClick: () => {},
  onMouseDown: () => {},
  width: 'default',
};

Button.displayName = 'Button';

export default Button;
