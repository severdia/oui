import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
const SettingsIcon16 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/16/settings-16.svg');
const SettingsIcon24 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/24/settings-24.svg');
/* eslint-enable max-len */

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const SettingsIcon = (props) => {
  let Svg;
  let sizeclass;

  switch (props.size) {
    case 16:
      Svg = SettingsIcon16;
      sizeclass = 'oui-icon--16';
      break;
    case 24:
      Svg = SettingsIcon24;
      sizeclass = 'oui-icon--24';
      break;
    default:
      Svg = SettingsIcon16;
      sizeclass = `oui-icon--${ props.size }`;
  }

  return (
    <Svg
      className={ 'oui-icon display--inline ' + sizeclass }
      data-test-section={ props.testSection }
    />
  );
};

SettingsIcon.propTypes = {
  /** Size of the icon */
  size: PropTypes.oneOf([12, 16, 24]).isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default SettingsIcon;
