import React, { cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export class Accordion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.initiallySelected,
    };
  }

  handleSelection(selected) {
    this.setState({selected});
  }

  // inspired by React-Bootstrap Carousel
  render() {
    return (
      <ul
        data-oui-component={ true }
        className="accordion accordion__react"
        data-test-section={ this.props.testSection }>
        {React.Children.map(this.props.children, (child, index) => {
          if (!isValidElement(child)) {
            return null;
          }
          return cloneElement(child, {
            key: index,
            _onClickHandler: this.handleSelection.bind(this, index),
            _isSelected: index === this.state.selected,
          });
        })}
      </ul>
    );
  }
}
Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  initiallySelected: PropTypes.number,
  testSection: PropTypes.string,
};
Accordion.defaultProps = {
  initiallySelected: 0,
};

export function AccordionSection({
  _isSelected,
  _onClickHandler,
  children,
  testSection,
  title,
}) {
  return (
    <li
      data-test-section={ testSection }
      className={ classNames(
        'accordion__item',
        'accordion__item__react',
        {
          'is-active': _isSelected,
        }) }>
      <a className="accordion__link" onClick={ _onClickHandler }>{title}</a>

      <div className="accordion__content-wrap accordion__content-wrap__react">
        <div className="accordion__content flex--column height--1-1">
          {children}
        </div>
      </div>
    </li>
  );
}
AccordionSection.propTypes = {
  _isSelected: PropTypes.bool,
  _onClickHandler: PropTypes.func,
  children: PropTypes.node.isRequired,
  testSection: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default {
  Accordion,
  AccordionSection,
};
