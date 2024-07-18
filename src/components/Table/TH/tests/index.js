import React from 'react';
import TH from '../index';
import { shallow, render } from 'enzyme';

describe('components/Table/TH', () => {
  it('should render as a `th`', () => {
    const component = shallow(<TH></TH>);
    expect(component.type()).toBe('th');
  });

  it('should render children', () => {
    const component = shallow(<TH>foo</TH>);
    expect(component.text()).toBe('foo');
  });

  it('should render with test section', () => {
    const component = shallow(<TH testSection="goose"></TH>);
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });

  it('should add numerical class to table cells when provided', () => {
    const component = shallow(<TH isNumerical={ true }></TH>);
    expect(component.hasClass('oui-numerical')).toBe(true);
  });

  it('should not add numerical class to table cells by default', () => {
    const component = shallow(<TH></TH>);
    expect(component.hasClass('oui-numerical')).toBe(false);
  });

  it('should add collapsed class to table cells when provided', () => {
    const component = shallow(<TH isCollapsed={ true }></TH>);
    expect(component.hasClass('oui-cell-collapse')).toBe(true);
  });

  it('should not add collapsed class to table cells by default', () => {
    const component = shallow(<TH></TH>);
    expect(component.hasClass('oui-cell-collapse')).toBe(false);
  });

  it('should add width inline style to table cells when provided', () => {
    const component = render(<TH width="50%"></TH>);
    expect(component.attr('style')).toContain('width:50%');
  });

  it('should not add width inline style to table cells by default', () => {
    const component = render(<TH></TH>);
    const componentStyle = component.children().attr('style');

    if (componentStyle) {
      expect(componentStyle).not.toContain('width');
    }
  });
});
