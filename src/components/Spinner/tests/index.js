import React from 'react';
import Spinner from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/Spinner', () => {
  it('should render correctly', () => {
    const output = shallow(
      <Spinner />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly with overlay', () => {
    const output = shallow(
      <Spinner hasOverlay={ true } />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly with size property set to tiny', () => {
    const output = shallow(
      <Spinner size='tiny' />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly with size & overlay props', () => {
    const output = shallow(
      <Spinner hasOverlay={ true } size='tiny' />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should render correctly including testSection prop', () => {
    const output = shallow(
      <Spinner testSection='testing-foo' />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
