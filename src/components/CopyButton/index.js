import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Button from '../Button';
import Icon from 'react-oui-icons';

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 * @private
 */

const CopyButton = ({
  style,
  testSection,
  textToCopy,
}) => {

  return (
    <CopyToClipboard
      text={ textToCopy }>
      <Button
        style={ style === 'none' ? null : style }
        ariaLabel="Copy code snippet"
        testSection={ testSection ? `${testSection}-copy-button` : null }>
        <Icon name='clipboard' />
      </Button>
    </CopyToClipboard>
  );
};

CopyButton.propTypes = {
  /** Style option for the button */
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
    'none',
  ]),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
  /** The text or code that will be copied */
  textToCopy: PropTypes.string.isRequired,
};

CopyButton.defaultProps = {
  style: 'plain',
};

export default CopyButton;
