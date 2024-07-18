import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
const ArrowNsIcon16 = require('!babel?presets[]=react!svg-jsx-loader!oui-icons/src/16/arrow-ns-16.svg');
/* eslint-enable max-len */

/**
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const ArrowNsIcon = (props) => {
  let Svg;
  let sizeclass;

  switch (props.size) {
    case 16:
      Svg = ArrowNsIcon16;
      sizeclass = 'oui-icon--16';
      break;
    default:
      Svg = ArrowNsIcon16;
      sizeclass = `oui-icon--${ props.size }`;
  }

  return (
    <Svg
      className={ 'oui-icon display--inline ' + sizeclass }
      data-test-section={ props.testSection }
    />
  );
};

ArrowNsIcon.propTypes = {
  /** Size of the icon */
  size: PropTypes.oneOf([12, 16, 24]).isRequired,
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

export default ArrowNsIcon;
