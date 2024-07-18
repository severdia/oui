import PropTypes from 'prop-types';
import React from 'react';

const Title = props => (
  <div className="push-quad--bottom">
    <div className="beta push--bottom">
      { props.children }
    </div>
    { props.subtitle && (
      <div className="push--bottom">
        { props.subtitle }
      </div>
    ) }
  </div>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
};

export default Title;
