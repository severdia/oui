import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
const AbIcon16 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/16/ab-16.svg');
const AbIcon24 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/24/ab-24.svg');
/* eslint-enable max-len */

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const AbIcon = (props) => {
  let Svg;
  let sizeclass;

  switch (props.size) {
    case 16:
      Svg = AbIcon16;
      sizeclass = 'oui-icon--16';
      break;
    case 24:
      Svg = AbIcon24;
      sizeclass = 'oui-icon--24';
      break;
    default:
      Svg = AbIcon16;
      sizeclass = `oui-icon--${ props.size }`;
  }

  return (
    <Svg
      className={ 'oui-icon display--inline ' + sizeclass }
      data-test-section={ props.testSection }
    />
  );
};

AbIcon.propTypes = {
  /** Size of the icon */
  size: PropTypes.oneOf([12, 16, 24]).isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default AbIcon;
