import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Tab from './Tab';

/**
 * Wrapper component for a set of tabs
 * @param {Object} props - Properties passed to component
 * @returns {ReactElement}
 */
const TabNav = ({
  activeTab,
  children,
  style,
  testSection,
}) => {
  const tabStyleClasses = style ? style.map((styleName) => {
    return `oui-tabs--${styleName}`;
  }) : '';

  const classes = classNames(
    tabStyleClasses,
    'oui-tabs'
  );

  // Determine if the child is an active tab.
  // From http://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
  const childrenWithProps = React.Children.map(children, (child) => {
    // guard against conditionally rendered children
    if (child === null) {
      return null;
    }
    return React.cloneElement(child, {
      isActive: activeTab === child.props.tabId,
    });
  });

  return (
    <div
      data-oui-component={ true }
      data-test-section={ testSection }
      className={ classes }>
      <ul
        className="oui-tabs-nav"
        data-test-section="tabs-menu">
        { childrenWithProps }
      </ul>
    </div>
  );
};

TabNav.propTypes = {
  /** Id corresponding to which tab should be given the active class */
  activeTab: PropTypes.string.isRequired,
  /** Set of Tab components */
  children: PropTypes.node.isRequired,
  /** Various styles that can be given to the navigation */
  style: PropTypes.arrayOf(PropTypes.oneOf([
    'center',
    'dashboard',
    'header',
    'left-pad',
    'plain',
    'small',
    'sub',
  ])),
  /** Hook for automated JavaScript tests */
  testSection: PropTypes.string,
};

TabNav.Tab = Tab;

export default TabNav;
