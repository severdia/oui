import React from 'react';
import { mount } from 'enzyme';

import Pagination from '../index';
import Button from '../../Button';

describe('components/Pagination', () => {
  let component;
  let mockCurrentPage;
  let mockTotalPages;
  let onChangeSpy;
  let testSection;
  beforeEach(() => {
    mockCurrentPage = 3;
    mockTotalPages = 10;
    onChangeSpy = jest.fn();
    testSection = 'oui-pagination';
    component = mount(
      <Pagination
        currentPage={ mockCurrentPage }
        testSection={ testSection }
        totalPages={ mockTotalPages }
        onChange={ onChangeSpy }
      />
    );
  });

  describe('basic rendering', () => {
    it('should render ButtonRow with 4 Buttons and 1 span', () => {
      const buttonRow = component.find('ButtonRow');

      expect(buttonRow.exists()).toBe(true);
      expect(buttonRow.prop('centerGroup').length).toEqual(5);
      const centerButtons = component.find(`[data-test-section="${testSection + '-center'}"]`);

      expect(centerButtons.childAt(0).type()).toBe(Button);
      expect(centerButtons.childAt(1).type()).toBe(Button);
      expect(centerButtons.childAt(2).type()).toBe('span');
      expect(centerButtons.childAt(3).type()).toBe(Button);
      expect(centerButtons.childAt(4).type()).toBe(Button);
    });

    it('should render disable First and Back Buttons when page is equal to 1', () => {
      component.setProps({ currentPage: 1 });
      const centerButtons = component.find(`[data-test-section="${testSection + '-center'}"]`);
      expect(centerButtons.childAt(0).prop('isDisabled')).toBe(true);
      expect(centerButtons.childAt(1).prop('isDisabled')).toBe(true);
    });


    it('should render disable Last and Next Buttons when current page is equal to totalPages', () => {
      component.setProps({ currentPage: mockTotalPages });
      const centerButtons = component.find(`[data-test-section="${testSection + '-center'}"]`);
      expect(centerButtons.childAt(3).prop('isDisabled')).toBe(true);
      expect(centerButtons.childAt(4).prop('isDisabled')).toBe(true);
    });
  });

  describe('editing', () => {
    it('should call onChange with page equal to 1 when First Button is clicked', () => {
      const centerButtons = component.find(`[data-test-section="${testSection + '-center'}"]`);
      centerButtons.childAt(0).simulate('click');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(1);
    });

    it('should call onChange with page equal to n - 1 when Back Button is clicked', () => {
      const centerButtons = component.find(`[data-test-section="${testSection + '-center'}"]`);
      centerButtons.childAt(1).simulate('click');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(mockCurrentPage - 1);
    });

    it('should call onChange with page equal to n + 1 when Next Button is clicked', () => {
      const centerButtons = component.find(`[data-test-section="${testSection + '-center'}"]`);
      centerButtons.childAt(3).simulate('click');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(mockCurrentPage + 1);
    });

    it('should call onChange with page equal to totalPages when Last Button is clicked', () => {
      const centerButtons = component.find(`[data-test-section="${testSection + '-center'}"]`);
      centerButtons.childAt(4).simulate('click');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      expect(onChangeSpy).toHaveBeenCalledWith(mockTotalPages);
    });
  });

});
