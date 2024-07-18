import React from 'react';
import RangeSlider from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { redBase } from '../../../tokens/forimport/index.es';

describe('components/RangeSlider', () => {
  let component;
  let handlerObj;

  describe('default fill color', () => {
    beforeEach(() => {
      handlerObj = {
        onChange: () => {},
      };
      spyOn(handlerObj, 'onChange');
      component = shallow(
        <RangeSlider
          value={ 50 }
          onChange={ handlerObj.onChange }
          testSection="myTestSection"
        />
      );
    });

    it('should render component same as snapshot', () => {
      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('should render component with correct props', () => {
      expect(component.length).toBe(1);
    });

    it('should set the input value from the value prop', () => {
      const input = component.find('input');
      expect(input.prop('value')).toBe(50);
    });

    it('should set the position of the overlay from the value prop', () => {
      const overlay = component.find('.range-display-overlay');
      expect(overlay.prop('style').left).toBe('50%');
    });

    it('should call the onChange prop when the input onChange is called', () => {
      component.find('input').prop('onChange')();
      expect(handlerObj.onChange).toHaveBeenCalled();
    });

    it('should set a data-test-section attribute from the testSection prop', () => {
      const testSection = component.find('[data-test-section="myTestSection"]');
      expect(testSection.length).toBe(1);
    });
  });

  describe('custom fill color', () => {
    beforeEach(() => {
      handlerObj = {
        onChange: () => {},
      };
      spyOn(handlerObj, 'onChange');
      component = shallow(
        <RangeSlider
          fillColorName="red"
          value={ 50 }
          onChange={ handlerObj.onChange }
          testSection="myTestSection"
        />
      );
    });

    it('should render the SVG with the fill color that corresponds to the provided fill color name', () => {
      const svgPath = component.find('path');
      expect(svgPath.prop('fill')).toBe(redBase);
    });
  });
});
