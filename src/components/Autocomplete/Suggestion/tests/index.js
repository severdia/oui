import React from 'react';
import { mount } from 'enzyme';

import Suggestion from '../index';

describe('components/Autocomplete/Suggestion', () => {
  let mockSuggestion;
  let testSection;
  let component;
  beforeEach(() => {
    mockSuggestion = 'foo';
    testSection = 'oui-link';
    component = mount(
      <Suggestion
        suggestion={ mockSuggestion }
        testSection={ testSection }
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  describe('basic rendering', () => {
    it('should render Link', () => {
      expect(component.find('Link').exists()).toBe(true);
    });
  });

});
