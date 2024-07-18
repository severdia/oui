import React from 'react';
import TabNav from '../index';
import { shallow, mount } from 'enzyme';

describe('components/TabNav', () => {
  const mockFunction = jest.fn();
  it('should render with correct classes', () => {
    const component = shallow(
      <TabNav activeTab='foo'>
        <foo></foo>
      </TabNav>
    );
    expect(component.hasClass('oui-tabs')).toBe(true);
    expect(component.children().hasClass('oui-tabs-nav')).toBe(true);
  });

  it('should render children', () => {
    const component = shallow(
      <TabNav activeTab='foo'>
        <foo></foo>
      </TabNav>
    );
    expect(component.containsMatchingElement(<foo></foo>)).toBe(true);
  });

  it('should render even with conditionally rendered children', () => {
    const shouldRender = false;
    const component = shallow(
      <TabNav activeTab='foo'>
        <foo></foo>
        { shouldRender &&
          <bar></bar>
        }
      </TabNav>
    );
    expect(component.containsMatchingElement(<foo></foo>)).toBe(true);
    expect(component.containsMatchingElement(<bar></bar>)).toBe(false);
  });

  it('should add the active class to the tab with the same active id assigned to activeTab', () => {
    const component = mount(
      <TabNav activeTab='first'>
        <TabNav.Tab tabId='first' onClick={ mockFunction }>Foo</TabNav.Tab>
        <TabNav.Tab tabId='second' onClick={ mockFunction }>Bar</TabNav.Tab>
      </TabNav>
    );

    expect(component.find('.is-active').length).toBe(1);
  });

  describe('with `style` prop supplied', () => {
    it('should render with prop value as OUI tab class modifier', () => {
      const component = shallow(
        <TabNav
          activeTab='foo'
          style={ ['small', 'center'] }>
          <foo></foo>
        </TabNav>
      );
      expect(component.hasClass('oui-tabs--small')).toBe(true);
      expect(component.hasClass('oui-tabs--center')).toBe(true);
    });
  });

  describe('with no `style` prop supplied', () => {
    it('should render without OUI tab class modifiers', () => {
      const component = shallow(
        <TabNav activeTab='foo'>
          <foo></foo>
        </TabNav>
      );
      expect(component.is('[class*="oui-tabs--"]')).toBe(false);
    });
  });

  it('should render with test section when provided', () => {
    const component = shallow(
      <TabNav
        activeTab='foo'
        testSection="goose">
        <foo></foo>
      </TabNav>
    );
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });
});
