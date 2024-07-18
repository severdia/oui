import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CopyButton from '../index';

describe('components/CopyButton', () => {
  it('should render children the icon button', () => {
    const component = shallow(
      <CopyButton textToCopy={ 'let bingo = "BINGO"' } testSection="fake-test-section"/>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

});

