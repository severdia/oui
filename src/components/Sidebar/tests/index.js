import React from 'react';
import { mount } from 'enzyme';

import Sidebar from '../Sidebar';

describe('components/Sidebar', function() {
  let component;
  let mockSidebarContent;
  let mockWidth;

  beforeEach(function() {
    mockSidebarContent = 'mock sidebar content';
    mockWidth = 100;
    component = mount(
      <Sidebar width={ mockWidth } testSection='oui-sidebar'>
        <div data-test-section="sidebar-child">{ mockSidebarContent }</div>
      </Sidebar>
    );
  });

  afterEach(function() {
    component.unmount();
  });

  describe('basic rendering', function() {
    it('should render component with default props', function() {
      const sidebarComponent = component.find('[data-test-section="oui-sidebar"]');
      expect(sidebarComponent.exists()).toBe(true);
      expect(sidebarComponent.hasClass('oui-sidebar')).toEqual(true);
      expect(sidebarComponent.hasClass('oui-sidebar--open-left')).toEqual(false);
      expect(sidebarComponent.hasClass('oui-sidebar--open-right')).toEqual(false);
      expect(sidebarComponent.hasClass('position--absolute')).toEqual(true);
      expect(sidebarComponent.hasClass('height--1-1')).toEqual(true);

      const props = sidebarComponent.props();
      expect(props.style).toHaveProperty('maxWidth', 0);
      expect(props.style).toHaveProperty('width', 0);
      expect(props['data-oui-component']).toBe(true);

      const childComponent = component.find('[data-test-section="sidebar-child"]');
      expect(childComponent.exists()).toBe(false);
    });

    it('should render children when sidebar is open', function() {
      component.setProps({ isOpen: true });

      const childComponent = component.find('[data-test-section="sidebar-child"]');
      expect(childComponent.exists()).toBe(true);
      expect(childComponent.text()).toEqual(mockSidebarContent);
    });

    it('should add docked class when Sidebar is docked', function() {
      expect(component.find('[data-test-section="oui-sidebar"]').hasClass('position--relative')).toEqual(false);
      component.setProps({ docked: true });
      expect(component.find('[data-test-section="oui-sidebar"]').hasClass('position--relative')).toEqual(true);
    });

    it('should add open left props when Sidebar anchor is left', function() {
      component.setProps({ isOpen: false, anchor: 'left' });
      const closedProps = component.find('[data-test-section="oui-sidebar"]').props();
      expect(closedProps.style).toHaveProperty('left', -1 * mockWidth);
      expect(closedProps.style).not.toHaveProperty('right');

      component.setProps({ isOpen: true, anchor: 'left' });
      const openProps = component.find('[data-test-section="oui-sidebar"]').props();
      expect(openProps.style).toHaveProperty('left', 0);
      expect(openProps.style).not.toHaveProperty('right');
    });

    it('should add open right class when Sidebar anchor is right', function() {
      component.setProps({ isOpen: false, anchor: 'right' });
      const closedSidebar = component.find('[data-test-section="oui-sidebar"]');
      expect(closedSidebar.hasClass('visibility--hidden')).toBe(true);
      const closedProps = closedSidebar.props();
      expect(closedProps.style).toHaveProperty('right', 0);
      expect(closedProps.style).not.toHaveProperty('left');

      component.setProps({ isOpen: true, anchor: 'right' });
      const openSidebar = component.find('[data-test-section="oui-sidebar"]');
      expect(openSidebar.hasClass('visibility--hidden')).not.toBe(true);
      const openProps = openSidebar.props();
      expect(openProps.style).toHaveProperty('right', 0);
      expect(openProps.style).not.toHaveProperty('left');
    });
  });

});
