import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
const CreateAbIcon24 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/24/create-ab-24.svg');
/* eslint-enable max-len */

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const CreateAbIcon = (props) => {
  let Svg;
  let sizeclass;

  switch (props.size) {
    case 24:
      Svg = CreateAbIcon24;
      sizeclass = 'oui-icon--24';
      break;
    default:
      Svg = CreateAbIcon24;
      sizeclass = `oui-icon--${ props.size }`;
  }

  return (
    <Svg
      className={ 'oui-icon display--inline ' + sizeclass }
      data-test-section={ props.testSection }
    />
  );
};

CreateAbIcon.propTypes = {
  /** Size of the icon */
  size: PropTypes.oneOf([12, 16, 24]).isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default CreateAbIcon;
