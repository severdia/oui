import React from 'react';
import DiscloseTable from '../index';
import Table from '../../Table';
import { shallow, mount } from 'enzyme';

describe('components/DiscloseTable', () => {
  it('should render as a `table`', () => {
    const component = shallow(<DiscloseTable><Table.THead></Table.THead></DiscloseTable>);
    expect(component.type()).toBe('table');
  });

  it('should render children', () => {
    const component = mount(
      <DiscloseTable>
        <Table.THead>
          <Table.TR>
            <Table.TH>Table Header Name</Table.TH>
          </Table.TR>
        </Table.THead>
      </DiscloseTable>
    );
    expect(component.find('THead').exists()).toBe(true);
    expect(component.find('TR').exists()).toBe(true);
    expect(component.find('TH').exists()).toBe(true);
    expect(component.find('TH').text()).toBe('Table Header Name');
  });

  it('should render with correct style and classNames', function() {
    const component = shallow(<DiscloseTable><Table.THead></Table.THead></DiscloseTable>);
    expect(component.hasClass('oui-disclose-table')).toBe(true);
    expect(component.prop('style')).toEqual({
      tableLayout: 'auto',
    });

  });

  describe('with a test section', () => {
    it('should render with a test section', () => {
      const component = shallow(<DiscloseTable testSection="foo"><Table.THead></Table.THead></DiscloseTable>);
      expect(component.is('[data-test-section="foo"]')).toBe(true);
    });
  });
});
