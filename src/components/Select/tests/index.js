import React from 'react';
import Select from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/Select', () => {
  it('should render correctly when declared with no properties', () => {
    const output = shallow(
      <Select>
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly when isDisabled prop is declare', () => {
    const output = shallow(
      <Select isDisabled={ true } >
        <option value="one">This is option one</option>
        <option value="two">And this is option two</option>
      </Select>
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

});
