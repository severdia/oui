import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-oui-icons';

const CloseButton = props => (
  <button className="oui-close-button" onClick={ props.onClick }>
    <Icon name="close" size={ props.size } />
  </button>
);

CloseButton.propTypes = {
  /**
   *  Function to perform when the close button is clicked.
   */
  onClick: PropTypes.func.isRequired,
  /**
   *  Size of the close button.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

CloseButton.defaultProps = {
  size: 'medium',
};

export default CloseButton;
