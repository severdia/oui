import React from 'react';
import ProgressDots from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/ProgressDots', () => {
  it('should render correctly without props', () => {
    const output = shallow(
      <ProgressDots />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly with testSection prop', () => {
    const output = shallow(
      <ProgressDots testSection='testing-foo' />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
