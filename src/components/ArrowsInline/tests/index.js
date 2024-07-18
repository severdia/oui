import React from 'react';
import ArrowsInline from '../index';
import { shallow } from 'enzyme';

describe('components/ArrowsInline', () => {
  /**
   * The icons "chevrons" on their own don't contain much value and can be
   * hidden from screen readers. A label should provided to other components
   * (a button, for example) that may use this component.
   */
  it('should have aria-hidden property set to true', () => {
    const component = shallow(<ArrowsInline />);
    expect(component.is('[aria-hidden="true"]')).toBe(true);
  });

  it('should have a properly set test section', () => {
    const component = shallow(<ArrowsInline testSection="foo" />);
    expect(component.is('[data-test-section="foo"]')).toBe(true);
  });
});
