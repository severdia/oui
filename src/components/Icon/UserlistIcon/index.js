import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
const UserlistIcon16 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/16/userlist-16.svg');
const UserlistIcon24 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/24/userlist-24.svg');
/* eslint-enable max-len */

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const UserlistIcon = (props) => {
  let Svg;
  let sizeclass;

  switch (props.size) {
    case 16:
      Svg = UserlistIcon16;
      sizeclass = 'oui-icon--16';
      break;
    case 24:
      Svg = UserlistIcon24;
      sizeclass = 'oui-icon--24';
      break;
    default:
      Svg = UserlistIcon16;
      sizeclass = `oui-icon--${ props.size }`;
  }

  return (
    <Svg
      className={ 'oui-icon display--inline ' + sizeclass }
      data-test-section={ props.testSection }
    />
  );
};

UserlistIcon.propTypes = {
  /** Size of the icon */
  size: PropTypes.oneOf([12, 16, 24]).isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default UserlistIcon;
