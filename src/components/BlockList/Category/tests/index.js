import React from 'react';
import Category from '../index';
import { shallow } from 'enzyme';

describe('components/BlockList/Category', () => {
  it('should render children', () => {
    const text = 'Hi!';
    const component = shallow(<Category>{ text }</Category>);
    expect(component.text()).toBe(text);
  });

  it('should render `header` when provided', () => {
    const component = shallow(<Category header="123456">Goose</Category>);
    expect(component.text()).toContain(123456);
  });

  it('should properly set test section', () => {
    const component = shallow(<Category testSection="foo">Goose</Category>);
    expect(component.is('[data-test-section="foo"]')).toBe(true);
  });
});
