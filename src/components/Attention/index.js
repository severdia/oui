import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Icon from 'react-oui-icons';
import classNames from 'classnames';
import { getAssistiveTextFromColorClass } from '../../utils/accessibility';

const renderDismissButton = (testSection) => {
  return (
    <div className="oui-attention__close">
      <Button
        style="plain"
        size="small"
        ariaLabel="Close alert"
        testSection={ `${testSection}-dismiss` }>
        <Icon name='close' size='small' />
      </Button>
    </div>
  );
};

/**
 * Provide contextual feedback with a wide range of styles that can be used to
 * convey the message's importance.
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */

const Attention = ({
  alignment = 'left',
  children,
  isDismissible,
  testSection,
  type = 'brand',
}) => {
  const colorClassName = `oui-attention--${type}`;
  const alignmentClassName = `oui-text--${alignment}`;
  const attentionAriaLabel = getAssistiveTextFromColorClass(type);
  const alignClass = `oui-attention ${colorClassName} ${alignmentClassName}`.trim();
  const classes = classNames({
    [`${alignClass}`]: true,
  });
  const dismissBtn = isDismissible ? renderDismissButton(testSection) : null;

  return (
    <div
      data-oui-component={ true }
      className={ classes }
      data-test-section={ testSection }
      aria-label={ attentionAriaLabel }
      role="alert">
      { children }
      { dismissBtn }
    </div>
  );
};

Attention.propTypes = {
  /** How the text is aligned */
  alignment: PropTypes.oneOf(['left', 'center']),
  /** Text that appears within the component */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** Button allowing users to dismiss the component */
  isDismissible: PropTypes.bool,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** Various color schemes */
  type: PropTypes.oneOf(['bad-news', 'brand', 'good-news', 'warning']),
};

export default Attention;
