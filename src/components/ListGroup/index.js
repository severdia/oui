import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ListGroup = ({
  children,
  subtitle,
  testSection,
  title,
}) => {
  return (
    <div className="oui-listgroup flex soft--top soft--bottom border--bottom" data-test-section={ testSection }>
      <div className="width--1-4">
        <div className="zeta muted weight--normal"></div>
        <div className="epsilon line--tight force-break">{ title }</div>
        <div className="micro muted push-half--ends">{ subtitle }</div>
      </div>
      <div className="group flex--1 soft--left">
        { children }
      </div>
    </div>
  );
};
ListGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  subtitle: PropTypes.string,
  testSection: PropTypes.string,
  title: PropTypes.string,
};
ListGroup.defaultProps = {
  subtitle: '',
  testSection: '',
  title: '',
};

export const ListGroupItem = ({
  children,
  testSection,
  density,
}) => {

  let classes = classNames({
    'listgroup__item': true,
    'border--bottom': true,
    'soft--bottom soft--top': density === 'tight',
    'soft-double--bottom soft-double--top': density === 'loose',
  });

  return (
    <div className={ classes } data-test-section={ testSection }>
      { children }
    </div>
  );
};
ListGroupItem.propTypes = {
  children: PropTypes.node.isRequired,
  density: PropTypes.oneOf(['tight', 'loose']),
  testSection: PropTypes.string,
};

ListGroupItem.defaultProps = {
  density: 'loose',
};

ListGroup.Item = ListGroupItem;

export default ListGroup;
