import React from 'react';
import TBody from '../index';
import { shallow } from 'enzyme';

describe('components/Table/TBody', () => {
  it('should render as a `tbody`', () => {
    const component = shallow(<TBody></TBody>);
    expect(component.type()).toBe('tbody');
  });

  it('should render children', () => {
    const component = shallow(<TBody><td></td></TBody>);
    expect(component.containsMatchingElement(<td></td>)).toBe(true);
  });

  it('should render with test section', () => {
    const component = shallow(<TBody testSection="goose"></TBody>);
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });
});
