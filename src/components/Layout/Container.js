import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * Use a custom element for this component
   */
  as: PropTypes.elementType,
  /**
   * Allow the Container to fill available horizontal space.
   */
  fluid: PropTypes.bool,
  /**
   * For testing/debugging only -- show hotpink grid borders and backgrounds.
   */
  outlineDebug: PropTypes.bool,
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
   * Remove first and last child side padding.
   */
  pullRowPadding: PropTypes.bool,
  /**
   * Add top margin space between rows.
   */
  pushRowsTop: PropTypes.bool,
};

const defaultProps = {
  as: 'div',
  fluid: false,
};

const Container = React.forwardRef(({
  as: Component,
  fluid,
  outlineDebug,
  paddedContent,
  pullRowPadding,
  pushRowsTop,
  ...props
}, ref) => {
  const prefix = 'container';

  return (
    <Component
      ref={ ref }
      { ...props }
      className={ classNames(
        fluid ? `${prefix}-fluid` : prefix,
        outlineDebug && 'outline--debug',
        paddedContent && `padded-content--${paddedContent}`,
        pullRowPadding && 'container--pull',
        pushRowsTop && 'push-rows--top',
      ) }
    />
  );
},
);

Container.displayName = 'Container';
Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
