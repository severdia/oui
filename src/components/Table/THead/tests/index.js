import React from 'react';
import THead from '../index';
import { shallow } from 'enzyme';

describe('components/Table/THead', () => {
  it('should render as a `thead`', () => {
    const component = shallow(<THead></THead>);
    expect(component.type()).toBe('thead');
  });

  it('should render children', () => {
    const component = shallow(<THead><th></th></THead>);
    expect(component.containsMatchingElement(<th></th>)).toBe(true);
  });

  it('should render with test section', () => {
    const component = shallow(<THead testSection="goose"></THead>);
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });
});
