import React from 'react';
import { Link } from 'react-router';

const LinkActive = (props) => {
  if (props.currentRoute !== props.to) {
    return (
      <Link to={ props.to }>
        { props.children }
      </Link>
    );
  }

  return <span>{ props.children }</span>;
};

LinkActive.propTypes = {
  children: React.PropTypes.node.isRequired,
  currentRoute: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
};

export default LinkActive;
