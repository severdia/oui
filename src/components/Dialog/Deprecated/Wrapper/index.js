import PropTypes from 'prop-types';
import React from 'react';

const Wrapper = props => (
  <div
    data-oui-component={ true }
    className="overflow-y--auto flex--1"
    data-test-section={ props.testSection }>
    <div className="reading-column">
      <div className="push-quad--bottom">
        { props.children }
      </div>
    </div>
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  testSection: PropTypes.string,
};

export default Wrapper;
