import React from 'react';
import Checkbox from '../index';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/Checkbox', () => {
  const mockFunction = jest.fn();
  it('should render an input of type checkbox', () => {
    const component = mount(<Checkbox />);
    expect(component.find('input[type="checkbox"]').length).toBe(1);
  });

  it('should render a checked checkbox when `defaultChecked` is true', () => {
    const component = shallow(<Checkbox defaultChecked={ true } />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render an unchecked checkbox when `defaultChecked` is false', () => {
    const component = shallow(<Checkbox defaultChecked={ false } />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render a checked checkbox when `checked` is true', () => {
    const component = shallow(<Checkbox checked={ true } onChange={ mockFunction } />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render an unchecked checkbox when `checked` is false', () => {
    const component = shallow(<Checkbox checked={ false } onChange={ mockFunction } />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should throw an error if a checkbox is rendered without an onChange function', () => {
    spyOn(console, 'error').and.stub();

    mount(<Checkbox checked={ true } />);

    expect(console.error.calls.all()[0].args[0]).toContain('You provided a `checked` prop to a form field without an `onChange` handler'); // eslint-disable-line
  });

  it('should call the onChange event handler when the checkbox is changed', () => {
    const handler = {
      onChange: (event) => {},
    };
    spyOn(handler, 'onChange');

    const component = shallow(<Checkbox onChange={ handler.onChange } />);

    component.find('input').simulate('change');
    expect(handler.onChange).toHaveBeenCalled();
  });

  it('should be wrapped in a label', () => {
    const component = mount(<Checkbox />);

    const label = component.find('label');
    const checkbox = label.find('input[type="checkbox"]');

    expect(label.length).toBe(1);
    expect(checkbox.length).toBe(1);
  });

  it('label should render text', () => {
    const component = mount(<Checkbox label="foo" />);

    const label = component.find('label');
    expect(label.text()).toBe('foo');
  });

  it('should add disabled class to label text when disabled', () => {
    const component = mount(<Checkbox isDisabled={ true } />);

    const label = component.find('.oui-label--disabled');
    expect(label.length).toBe(1);
  });

  it('should not add disabled class to label text when not disabled', () => {
    const component = mount(<Checkbox isDisabled={ false } />);

    const label = component.find('.oui-label--disabled');
    expect(label.length).toBe(0);
  });

  it('should add disabled attribute to checkbox when disabled', () => {
    const component = mount(<Checkbox isDisabled={ true } />);

    const input = component.find('input[disabled]');
    expect(input.length).toBe(1);
  });

  it('should add weight--normal class to label text when no labelWeight prop present', () => {
    const component = mount(<Checkbox />);

    const label = component.find('.weight--normal');
    expect(label.length).toBe(1);
  });

  it('should add weight--normal class to label text when labelWeight prop = "normal"', () => {
    const component = mount(<Checkbox labelWeight="normal" />);

    const label = component.find('.weight--normal');
    expect(label.length).toBe(1);
  });

  it('should add weight--light class to label text when labelWeight prop = "light"', () => {
    const component = mount(<Checkbox labelWeight="light" />);

    const label = component.find('.weight--light');
    expect(label.length).toBe(1);
  });

  it('should add weight--bold class to label text when labelWeight prop = "bold"', () => {
    const component = mount(<Checkbox labelWeight="bold" />);

    const label = component.find('.weight--bold');
    expect(label.length).toBe(1);
  });

  it('should not add disabled attribute to checkbox when not disabled', () => {
    const component = mount(<Checkbox isDisabled={ false } />);
    expect(component.find('input').prop('disabled')).toBe(false);
  });

  it('should properly add a test section to label', () => {
    const component = mount(<Checkbox testSection="duck" />);
    expect(component.find('[data-test-section="duck-label"]').length).toBe(1);
  });

  it('should properly add a test section to checkbox', () => {
    const component = mount(<Checkbox testSection="duck" />);
    expect(component.find('input[type="checkbox"][data-test-section="duck"]').length).toBe(1);
  });
});
