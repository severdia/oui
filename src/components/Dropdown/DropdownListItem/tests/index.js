import React from 'react';
import DropdownListItem from '../index';
import { shallow } from 'enzyme';

describe('components/Dropdown/DropdownListItem', () => {
  it('should render as a `li`', () => {
    const component = shallow(<DropdownListItem></DropdownListItem>);
    expect(component.type()).toBe('li');
  });

  it('should render children', () => {
    const component = shallow(<DropdownListItem>foo</DropdownListItem>);
    expect(component.text()).toBe('foo');
  });

  it('should render with the dropdown item class', () => {
    const component = shallow(<DropdownListItem></DropdownListItem>);
    expect(component.find('li').prop('className')).toBe('oui-dropdown__item');
  });

  it('should render with hardSides', () => {
    const component = shallow(<DropdownListItem hardSides={ true }></DropdownListItem>);
    expect(component.find('li').prop('className')).toBe('hard--sides oui-dropdown__item');
  });

  it('should render with hardTop', () => {
    const component = shallow(<DropdownListItem hardTop={ true }></DropdownListItem>);
    expect(component.find('li').prop('className')).toBe('hard--top oui-dropdown__item');
  });
});
