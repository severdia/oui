import React from 'react';
import DiscloseRow from '../index';
import Table from '../../../Table';
import { mount } from 'enzyme';

describe('components/DiscloseTable/DiscloseRow', () => {
  let component;

  it('should render rowContents prop correctly', () => {
    component = mount(
      <DiscloseRow
        rowContents={ [ <Table.TD key={ 'foo' }>Experiment Name</Table.TD> ] }>
        <p>Content</p>
      </DiscloseRow>
    );
    expect(component.find('tr').find('TD').exists()).toBe(true);
  });

  it('should render the arrow inside first `Table.TD `', () => {
    component = mount(
      <DiscloseRow
        rowContents={ [ <Table.TD key={ 'foo' }>Experiment Name</Table.TD> ] }>
        <p>Content</p>
      </DiscloseRow>
    );
    expect(component.find('tr').find('td')
      .containsMatchingElement(<span className="oui-disclose__symbol push-half--right"></span>)).toBe(true);
  });

  describe('when in collapsed state', () => {
    beforeEach(function() {
      component = mount(
        <DiscloseRow
          rowContents={ [ <Table.TD key={ 'foo' }>Experiment Name</Table.TD> ] }>
          <p>Content</p>
        </DiscloseRow>
      );
    });
    it('should render a single "tr" row', () => {
      expect(component.children()).toHaveLength(1);
    });

    it('should have valid CSS classes applied', () => {
      expect(component.find('tr').hasClass('oui-disclose-table--row__toggle')).toBe(true);
      expect(component.find('tr').hasClass('is-active')).toBe(false);
    });

    it('should not render childrenn', function() {
      expect(component.find('tr').find('p').exists()).toBe(false);
    });
  });

  describe('when in expanded state', () => {
    let rowComponents = [ <Table.TD key={ 'foo' }>Experiment Name</Table.TD> ];
    beforeEach(function() {
      component = mount(
        <DiscloseRow
          rowContents={ rowComponents }>
          <p>Content</p>
        </DiscloseRow>
      );
      component.find('tr').simulate('click');
    });
    it('should render two "tr" rows', () => {
      expect(component.find('tr').length).toBe(2);
    });

    it('should have valid CSS classes applied', () => {
      expect(component.find('tr').first().hasClass('oui-disclose-table--row__toggle')).toBe(true);
      expect(component.find('tr').first().hasClass('is-active')).toBe(true);
      expect(component.find('tr').last().hasClass('oui-disclose-table--row__content')).toBe(true);
    });

    it('should render children', () => {
      expect(component.find('tr').find('p').exists()).toBe(true);
      expect(component.find('tr').last().find('td').prop('colSpan')).toBe(rowComponents.length + 1);
    });
  });
});
