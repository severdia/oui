import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
const CreateCampaignIcon24 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/24/create-campaign-24.svg');
/* eslint-enable max-len */

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const CreateCampaignIcon = (props) => {
  let Svg;
  let sizeclass;

  switch (props.size) {
    case 24:
      Svg = CreateCampaignIcon24;
      sizeclass = 'oui-icon--24';
      break;
    default:
      Svg = CreateCampaignIcon24;
      sizeclass = `oui-icon--${ props.size }`;
  }

  return (
    <Svg
      className={ 'oui-icon display--inline ' + sizeclass }
      data-test-section={ props.testSection }
    />
  );
};

CreateCampaignIcon.propTypes = {
  /** Size of the icon */
  size: PropTypes.oneOf([12, 16, 24]).isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default CreateCampaignIcon;
