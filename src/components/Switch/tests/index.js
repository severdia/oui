import React from 'react';
import Switch from '../index';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/Switch', () => {

  it('should render an `Switch` with correct props', () => {
    const component = shallow(<Switch />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render an `Switch` with correct props', () => {
    const component = shallow(<Switch />);
    expect(component.length).toBe(1);
  });

  it('should disable the switch', () => {
    const component = mount(<Switch isDisabled={ true } />);
    expect(component.find('input').hasClass('oui-switch--disabled')).toBe(true);
  });

  it('should disable the input', () => {
    const component = mount(<Switch isDisabled={ true } />);
    expect(component.find('input').is('[disabled]')).toBe(true);
  });

});
