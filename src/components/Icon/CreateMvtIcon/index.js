import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
const CreateMvtIcon24 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/24/create-mvt-24.svg');
/* eslint-enable max-len */

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const CreateMvtIcon = (props) => {
  let Svg;
  let sizeclass;

  switch (props.size) {
    case 24:
      Svg = CreateMvtIcon24;
      sizeclass = 'oui-icon--24';
      break;
    default:
      Svg = CreateMvtIcon24;
      sizeclass = `oui-icon--${ props.size }`;
  }

  return (
    <Svg
      className={ 'oui-icon display--inline ' + sizeclass }
      data-test-section={ props.testSection }
    />
  );
};

CreateMvtIcon.propTypes = {
  /** Size of the icon */
  size: PropTypes.oneOf([12, 16, 24]).isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default CreateMvtIcon;
