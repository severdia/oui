import React from 'react';
import TD from '../index';
import { shallow, render } from 'enzyme';

describe('components/Table/TD', () => {
  it('should render as a `td`', () => {
    const component = shallow(<TD></TD>);
    expect(component.type()).toBe('td');
  });

  it('should render children', () => {
    const component = shallow(<TD>foo</TD>);
    expect(component.text()).toBe('foo');
  });

  it('should render with test section', () => {
    const component = shallow(<TD testSection="goose"></TD>);
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });

  it('should add numerical class to table cells when provided', () => {
    const component = shallow(<TD isNumerical={ true }></TD>);
    expect(component.hasClass('oui-numerical')).toBe(true);
  });

  it('should not add numerical class to table cells by default', () => {
    const component = shallow(<TD></TD>);
    expect(component.hasClass('oui-numerical')).toBe(false);
  });

  it('should add vertical align class to table cells when provided', () => {
    const component = shallow(<TD verticalAlign="middle"></TD>);
    expect(component.hasClass('vertical-align--middle')).toBe(true);
  });

  it('should not add vertical align class to table cells when not provided', () => {
    const component = shallow(<TD></TD>);
    expect(component.hasClass('vertical-align--middle')).toBe(false);
  });

  it('should add width inline style to table cells when provided', () => {
    const component = render(<TD width="50%"></TD>);
    expect(component.attr('style')).toContain('width:50%');
  });

  it('should not add width inline style to table cells by default', () => {
    const component = render(<TD></TD>);
    const componentStyle = component.children().attr('style');

    if (componentStyle) {
      expect(componentStyle).not.toContain('width');
    }
  });

  it('should add colspan to table cells when provided', () => {
    const component = render(<TD colSpan={ 3 }></TD>);
    expect(component.attr('colspan')).toBe('3');
  });
});
