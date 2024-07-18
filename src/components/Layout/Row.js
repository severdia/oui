import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

const propTypes = {
  /**
   * @default 'row'
   */
  as: PropTypes.elementType,
  /**
   * Add visible border to row
  */
  border: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'sides',
    'ends',
    'all',
    'none',
  ]),
  /**
   * Display layout as vertical column.
  */
  displayVertical: PropTypes.bool,
  /**
   * For testing/debugging only -- show grid hotpink borders and backgrounds.
   */
  outlineDebug: PropTypes.bool,
  /**
   * Force overflow scrolling
   */
  overflow: PropTypes.oneOf([
    'none',
    'overflow-y--scroll',
    'overflow-x--auto',
    'overflow-y--auto',
  ]),
  /**
   * Pad inner content.
   */
  paddedContent: PropTypes.oneOf([
    'none',
    'around',
    'sides',
    'ends',
    'remove',
  ]),
  /**
   * Removes gutters and negative margins.
   */
  removeGutters: PropTypes.bool,
};

const defaultProps = {
  as: 'div',
  border: 'none',
  displayVertical: false,
  overflow: 'none',
  outlineDebug: false,
  paddedContent: 'none',
  removeGutters: false,
};

const Row = React.forwardRef(({
  as: Component,
  border,
  displayVertical,
  overflow,
  outlineDebug,
  paddedContent,
  removeGutters,
  ...props
}, ref) => {

  const classes = [];

  if (border) {
    classes.push(`border--${border}`);
  }

  if (displayVertical) {
    classes.push('flex--column');
  }

  if (outlineDebug) {
    classes.push('outline--debug');
  }

  if (overflow) {
    classes.push(overflow);
  }

  if (paddedContent && paddedContent !== 'none') {
    classes.push(`padded-content--${paddedContent}`);
  }

  return (
    <Component
      { ...props }
      className={ classNames(
        'row',
        classes,
        removeGutters && 'gutters--remove')
      }
    />
  );
},
);

Row.displayName = 'Row';
Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
