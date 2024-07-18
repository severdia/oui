import React from 'react';
import TextField from '../index';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/TextField', () => {
  it('should render a simple input with type text', () => {
    const output = shallow(
      <TextField
        type='text'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render with a simple label', () => {
    const output = shallow(
      <TextField
        label='simple label'
        type='text'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render with a simple label and a note', () => {
    const output = shallow(
      <TextField
        label='Simple label'
        note='simple note'
        type='text'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render error style', () => {
    const output = shallow(
      <TextField
        displayError={ true }
        label='Simple label'
        note='simple note'
        type='text'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render with a placeholder', () => {
    const output = shallow(
      <TextField
        placeholder='Simple placeholder'
        type='text'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render search icon', () => {
    const output = shallow(
      <TextField
        isFilter={ true }
        type='text'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render max and min limits', () => {
    const output = shallow(
      <TextField
        min={ 0 }
        max={ 100 }
        type='number'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should call onChange fn() prop when a change happen on input', () => {
    const blurEvent = jest.fn();
    const textField = mount(
      <TextField
        type='text'
        onBlur={ blurEvent }
      />
    );
    const input = textField.find('.oui-text-input');
    input.simulate('blur');
    expect(blurEvent).toHaveBeenCalled();
  });

  it('should call onBlur fn() prop when clicking out of input', () => {
    const changeEvent = jest.fn();
    const textField = mount(
      <TextField
        onChange={ changeEvent }
        type='text'
      />
    );
    const input = textField.find('.oui-text-input');
    input.simulate('change');
    expect(changeEvent).toHaveBeenCalled();
  });

  it('should call onKeyDown fn() prop when pressing keys on input', () => {
    const keydownEvent = jest.fn();
    const textField = mount(
      <TextField
        onKeyDown={ keydownEvent }
        type='text'
      />
    );
    const input = textField.find('.oui-text-input');
    input.simulate('keyDown');
    expect(keydownEvent).toHaveBeenCalled();
  });

  it('should call onFocus fn() prop when clicking on input', () => {
    const focusEvent = jest.fn();
    const textField = mount(
      <TextField
        onFocus={ focusEvent }
        type='text'
      />
    );
    const input = textField.find('.oui-text-input');
    input.simulate('focus');
    expect(focusEvent).toHaveBeenCalled();
  });

  it('should render HTML type=number for when prop.type is percent', () => {
    const output = shallow(
      <TextField
        type='percent'
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  describe('custom min max percentages', function() {

    it('should allow minimum and maximum percentages when type is percent', () => {
      const output = shallow(
        <TextField
          type='percent'
          min={ 70 }
          max={ 85 }
        />
      );
      expect(output.find('input').props().min).toBe(70);
      expect(output.find('input').props().max).toBe(85);
      expect(shallowToJson(output)).toMatchSnapshot();
    });

    describe('invalid custom minimum', function() {

      it('should revert to the default if it is below 0', () => {
        const output = shallow(
          <TextField
            type='percent'
            min={ -10 }
          />
        );
        expect(output.find('input').props().min).toBe(0);
        expect(output.find('input').props().max).toBe(100);
        expect(shallowToJson(output)).toMatchSnapshot();
      });

      it('should revert to the default if it is above 100', () => {
        const output = shallow(
          <TextField
            type='percent'
            min={ 101 }
          />
        );
        expect(output.find('input').props().min).toBe(0);
        expect(output.find('input').props().max).toBe(100);
        expect(shallowToJson(output)).toMatchSnapshot();
      });

      it('should revert to the default if it is above the maximum', () => {
        const output = shallow(
          <TextField
            type='percent'
            min={ 80 }
            max={ 79 }
          />
        );
        expect(output.find('input').props().min).toBe(0);
        expect(output.find('input').props().max).toBe(100);
        expect(shallowToJson(output)).toMatchSnapshot();
      });
    });

    describe('invalid custom maximum', function() {

      it('should revert to the default if it is below 0', () => {
        const output = shallow(
          <TextField
            type='percent'
            max={ -10 }
          />
        );
        expect(output.find('input').props().min).toBe(0);
        expect(output.find('input').props().max).toBe(100);
        expect(shallowToJson(output)).toMatchSnapshot();
      });

      it('should revert to the default if it is above 100', () => {
        const output = shallow(
          <TextField
            type='percent'
            max={ 101 }
          />
        );
        expect(output.find('input').props().min).toBe(0);
        expect(output.find('input').props().max).toBe(100);
        expect(shallowToJson(output)).toMatchSnapshot();
      });

      it('should revert to the default if it is below the minimum', () => {
        const output = shallow(
          <TextField
            type='percent'
            min={ 80 }
            max={ 79 }
          />
        );
        expect(output.find('input').props().min).toBe(0);
        expect(output.find('input').props().max).toBe(100);
        expect(shallowToJson(output)).toMatchSnapshot();
      });
    });
  });
});
