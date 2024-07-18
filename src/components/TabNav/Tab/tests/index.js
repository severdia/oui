import React from 'react';
import Tab from '../index';
import { shallow } from 'enzyme';

describe('components/TabNav/Tab', () => {
  const mockFunction = jest.fn();

  it('should render with correct classes', () => {
    const component = shallow(
      <Tab
        onClick={ mockFunction }
        tabId="foo">
      </Tab>
    );
    expect(component.hasClass('oui-tabs-nav__item')).toBe(true);
  });

  it('should call function passed to onClick after tab is clicked', () => {
    const obj = {
      func: mockFunction,
    };
    spyOn(obj, 'func').and.stub();

    const component = shallow(
      <Tab
        onClick={ obj.func }
        tabId="foo">
      </Tab>
    );
    component.simulate('click');

    expect(obj.func).toHaveBeenCalled();
  });

  describe('with a child with `isDisabled` prop supplied', () => {
    it('should render only that child with a disabled class', () => {
      const component = shallow(
        <Tab
          isDisabled={ true }
          onClick={ mockFunction }
          tabId="foo">
        </Tab>
      );
      expect(component.hasClass('oui-tab-disabled')).toBe(true);
    });
  });

  it('should render with test section when provided', () => {
    const component = shallow(
      <Tab
        testSection="goose"
        onClick={ mockFunction }
        tabId="foo">
      </Tab>
    );
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });
});
