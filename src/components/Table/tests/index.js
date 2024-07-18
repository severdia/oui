import React from 'react';
import Table from '../index';
import { shallow, render } from 'enzyme';

describe('components/Table', () => {
  it('should render as a table', () => {
    const component = shallow(<Table></Table>);
    expect(component.type()).toBe('table');
  });

  it('should render children', () => {
    const component = shallow(<Table><thead></thead></Table>);
    expect(component.containsMatchingElement(<thead></thead>)).toBe(true);
  });

  describe('with `density` prop supplied', () => {
    it('should render with prop value as OUI table class modifier', () => {
      const component = shallow(<Table density="loose"></Table>);
      expect(component.hasClass('oui-table--loose')).toBe(true);
    });
  });

  describe('with no `density` prop supplied', () => {
    it('should render with default `density` prop value as OUI table class modifier', () => {
      const component = shallow(<Table></Table>);
      expect(component.hasClass('oui-table--loose')).toBe(false);
    });
  });

  describe('with `tableLayoutAlgorithm` prop supplied', () => {
    it('should render with provided `tableLayoutAlgorithm` prop value as inline style', () => {
      const component = render(<Table tableLayoutAlgorithm='auto'></Table>);
      expect(component.attr('style')).toContain('table-layout:auto');
    });
  });

  describe('with no `tableLayoutAlgorithm` prop supplied', () => {
    it('should render with default `tableLayoutAlgorithm` prop value as inline style', () => {
      const component = render(<Table></Table>);
      expect(component.attr('style')).toContain('table-layout:fixed');
    });
  });

  describe('with `style` prop supplied', () => {
    it('should render with prop value as OUI table class modifier', () => {
      const component = shallow(<Table style="rule"></Table>);
      expect(component.hasClass('oui-table--rule')).toBe(true);
    });
  });

  describe('with no `style` prop supplied', () => {
    it('should render without OUI table class modifiers', () => {
      const component = shallow(<Table></Table>);
      expect(component.hasClass('oui-table--wall')).toBe(false);
      expect(component.hasClass('oui-table--rule')).toBe(false);
      expect(component.hasClass('oui-table--rule-no-bottom-border')).toBe(false);
    });
  });

  describe('with a test section', () => {
    it('should render with a test section', () => {
      const component = shallow(<Table testSection="goose"></Table>);
      expect(component.is('[data-test-section="goose"]')).toBe(true);
    });
  });
});
