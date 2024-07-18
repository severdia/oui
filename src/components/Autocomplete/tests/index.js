import React from 'react';
import { mount } from 'enzyme';

import Autocomplete from '../index';
import Link from '../../Link';

describe('components/Autocomplete', () => {
  let mockSuggestions;
  let onActionClickSpy;
  let onInputChangeSpy;
  let onSuggestionClickSpy;
  let testSection;
  let component;
  beforeEach(() => {
    mockSuggestions = ['foo', 'bar', 'baz'];
    onActionClickSpy = jest.fn();
    onInputChangeSpy = jest.fn();
    onSuggestionClickSpy = jest.fn();
    testSection = 'oui-autocomplete';
  });

  afterEach(() => {
    component.unmount();
  });

  describe('basic rendering', () => {
    beforeEach(function() {
      component = mount(
        <Autocomplete
          stateful={ true }
          suggestions={ mockSuggestions }
          onActionClick={ onActionClickSpy }
          onInputChange={ onInputChangeSpy }
          onSuggestionClick={ onSuggestionClickSpy }
          testSection={ testSection }
        />
      );
    });
    it('should only render Input when input is out of focus', () => {
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      const suggestionsComponent = component.find(`[data-test-section="${ testSection }-suggestions"]`);
      expect(inputComponent.exists()).toBe(true);
      expect(suggestionsComponent.exists()).toBe(false);
    });

    it('should render suggestions when Input is in focus', () => {
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');
      const suggestionsComponent = component.find(`[data-test-section="${ testSection }-suggestions"]`);
      expect(inputComponent.exists()).toBe(true);
      expect(suggestionsComponent.exists()).toBe(true);
    });

    it('should render action field when Input is in focus', () => {
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');
      const actionComponent = component.find(`[data-test-section="${ testSection }-action"]`);
      expect(actionComponent.exists()).toBe(true);
    });
  });

  describe('stateful editing', () => {
    beforeEach(function() {
      component = mount(
        <Autocomplete
          stateful={ true }
          suggestions={ mockSuggestions }
          onActionClick={ onActionClickSpy }
          onInputChange={ onInputChangeSpy }
          onSuggestionClick={ onSuggestionClickSpy }
          testSection={ testSection }
        />
      );
    });
    it('should list suggestions when input value matches suggestions', () => {
      const mockQuery = 'ba';
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');
      inputComponent.simulate('change', {
        target: {
          value: mockQuery,
        },
      });

      const suggestionsComponent = component.find(`[data-test-section="${ testSection }-suggestion"]`);
      expect(onInputChangeSpy).toHaveBeenCalledTimes(1);
      expect(onInputChangeSpy).toHaveBeenCalledWith(mockQuery);
      expect(suggestionsComponent.exists()).toBe(true);
      expect(suggestionsComponent.length).toEqual(2);
      expect(suggestionsComponent.at(0).text()).toEqual('bar');
      expect(suggestionsComponent.at(1).text()).toEqual('baz');
    });

    it('should call suggestion click-handler when a suggestion is clicked', () => {
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');
      const suggestionsComponent = component.find(`[data-test-section="${ testSection }-block-item"]`);
      suggestionsComponent.at(0).childAt(0).simulate('mousedown');

      expect(onSuggestionClickSpy).toHaveBeenCalledTimes(1);
      expect(onSuggestionClickSpy).toHaveBeenCalledWith('foo');
    });

    it('should not set the Input value to the suggestion when a suggestion is clicked', () => {
      const mockQuery = 'f';
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');
      inputComponent.simulate('change', {
        target: {
          value: mockQuery,
        },
      });
      const suggestionsComponent = component.find(`[data-test-section="${ testSection }-block-item"]`);
      suggestionsComponent.at(0).childAt(0).simulate('mousedown');
      component.update();
      const inputValue = component.find(`[data-test-section="${ testSection }-input"]`).prop('value');
      expect(inputValue).toEqual('f');
    });

    it('should call action click-handler when action is clicked', () => {
      const ActionField = (props) => <Link { ...props }>test</Link>;
      component.setProps({ ActionField });

      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');

      const actionComponent = component.find(`[data-test-section="${ testSection }-action"]`).childAt(0);
      actionComponent.simulate('mousedown');
      expect(onActionClickSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('stateless editing', () => {
    beforeEach(() => {
      component = mount(
        <Autocomplete
          stateful={ false }
          suggestions={ mockSuggestions }
          onActionClick={ onActionClickSpy }
          onInputChange={ onInputChangeSpy }
          onSuggestionClick={ onSuggestionClickSpy }
          testSection={ testSection }
        />
      );
    });

    // TODO: Kelly fix this test once you can
    // figure out how to mock AwesomeDebounce
    xit('should wrap onInputChange in a debounce method, which is called when input changes, without updating any state', () => {
      const mockQuery = 'ba';
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');
      inputComponent.simulate('change', {
        target: {
          value: mockQuery,
        },
      });

      expect(onInputChangeSpy).toHaveBeenCalledTimes(1);
      expect(onInputChangeSpy).toHaveBeenCalledWith(mockQuery);
      const suggestionsComponent = component.find(`[data-test-section="${ testSection }-suggestion"]`);
      expect(suggestionsComponent.exists()).toBe(true);
      // The internal suggestion list should match the suggestions
      // provided via props
      expect(suggestionsComponent.length).toEqual(mockSuggestions.length);
    });
    it('should not call onInputChange when focusing', () => {
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');

      expect(onInputChangeSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('when autoFillInputValue is true', function() {
    beforeEach(function() {
      component = mount(
        <Autocomplete
          stateful={ true }
          suggestions={ mockSuggestions }
          onActionClick={ onActionClickSpy }
          onInputChange={ onInputChangeSpy }
          onSuggestionClick={ onSuggestionClickSpy }
          testSection={ testSection }
          autoFillInputValue={ true }
        />
      );
    });

    it('should set the Input value to the suggestion when a suggestion is clicked', () => {
      const mockQuery = 'f';
      const inputComponent = component.find(`[data-test-section="${ testSection }-input"]`);
      inputComponent.simulate('focus');
      inputComponent.simulate('change', {
        target: {
          value: mockQuery,
        },
      });
      const suggestionsComponent = component.find(`[data-test-section="${ testSection }-block-item"]`);
      suggestionsComponent.at(0).childAt(0).simulate('mousedown');
      component.update();
      const inputValue = component.find(`[data-test-section="${ testSection }-input"]`).prop('value');
      expect(inputValue).toEqual('foo');
    });
  });

});
