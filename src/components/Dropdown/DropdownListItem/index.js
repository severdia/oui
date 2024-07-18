import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function DropdownListItem(props) {
  const classes = classNames({
    'hard--sides': props.hardSides,
    'hard--top': props.hardTop,
    'oui-dropdown__item': true,
  });


  return (
    <li
      className={ classes }>
      { props.children }
    </li>
  );
}

DropdownListItem.propTypes = {
  /** Nodes to display within */
  children: PropTypes.node,
  /** Remove padding from sides */
  hardSides: PropTypes.bool,
  /** Remove padding from top */
  hardTop: PropTypes.bool,
};
