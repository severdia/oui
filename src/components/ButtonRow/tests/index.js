import React from 'react';
import Button from '../../Button';
import ButtonRow from '../';
import { shallow, mount } from 'enzyme';

describe('components/ButtonRow', () => {
  describe('with no buttons supplied', () => {
    it('should not render buttons', () => {
      const component = mount(
        <ButtonRow
          testSection="buttonRowTest"
        />
      );

      expect(component.find('[data-test-section="buttonRowTest-left"]').length).toBe(0);
      expect(component.find('[data-test-section="buttonRowTest-center"]').length).toBe(0);
      expect(component.find('[data-test-section="buttonRowTest-right"]').length).toBe(0);
    });
  });

  describe('with only left buttons supplied', () => {
    it('should render correct number of buttons if buttons are supplied', () => {
      const component = mount(
        <ButtonRow
          testSection="buttonRowTest"
          leftGroup={ [
            <Button key="1" style="plain">Button</Button>,
            <Button key="2" style="plain">Button</Button>,
            <Button key="3" style="plain">Button</Button>,
            <Button key="4" style="plain">Button</Button>,
            <Button key="5" style="plain">Button</Button>,
          ] }
        />
      );

      expect(component.find('[data-test-section="buttonRowTest-left"] button').length).toBe(5);
    });
  });

  describe('with only right buttons supplied', () => {
    it('should render correct number of buttons if buttons are supplied', () => {
      const component = mount(
        <ButtonRow
          testSection="buttonRowTest"
          rightGroup={ [
            <Button key="1" style="plain">Button</Button>,
            <Button key="2" style="plain">Button</Button>,
            <Button key="3" style="plain">Button</Button>,
            <Button key="4" style="plain">Button</Button>,
            <Button key="5" style="plain">Button</Button>,
          ] }
        />
      );
      expect(component.find('[data-test-section="buttonRowTest-right"] button').length).toBe(5);
    });
  });

  describe('with only center buttons supplied', () => {
    it('should render correct number of buttons if buttons are supplied', () => {
      const component = shallow(
        <ButtonRow
          testSection="buttonRowTest"
          centerGroup={ [
            <Button key="1" style="plain">Button</Button>,
            <Button key="2" style="plain">Button</Button>,
          ] }
        />
      );
      expect(component.find('.oui-button-row--center').length).toBe(1);
      expect(component.find(Button).length).toBe(2);
    });

    it('should add a wrapper and correct classes when a provided button in group is full width', () => {
      const component = shallow(
        <ButtonRow
          centerGroup={ [
            <Button key="1" width="full">Button</Button>,
            <Button key="2">Button</Button>,
            <Button key="3">Button</Button>,
          ] }
        />
      );

      expect(component.find(Button).at(0).parent().hasClass('push-half--right')).toBe(true);
      expect(component.find(Button).at(0).parent().hasClass('push-half--left')).toBe(false);
      expect(component.find(Button).at(0).parent().hasClass('flex--1')).toBe(true);

      expect(component.find(Button).at(1).parent().hasClass('push-half--right')).toBe(true);
      expect(component.find(Button).at(1).parent().hasClass('push-half--left')).toBe(true);
      expect(component.find(Button).at(1).parent().hasClass('flex--1')).toBe(true);

      expect(component.find(Button).at(2).parent().hasClass('push-half--right')).toBe(false);
      expect(component.find(Button).at(2).parent().hasClass('push-half--left')).toBe(true);
      expect(component.find(Button).at(2).parent().hasClass('flex--1')).toBe(true);
    });

    it('should not add a wrapper when none of the provided buttons in a group are full width', () => {
      const component = shallow(
        <ButtonRow
          centerGroup={ [
            <Button key="1">Button</Button>,
            <Button key="2">Button</Button>,
            <Button key="3">Button</Button>,
          ] }
        />
      );

      expect(component.find(Button).at(0).parent().hasClass('push-half--right')).toBe(false);
      expect(component.find(Button).at(0).parent().hasClass('push-half--left')).toBe(false);

      expect(component.find(Button).at(1).parent().hasClass('push-half--right')).toBe(false);
      expect(component.find(Button).at(1).parent().hasClass('push-half--left')).toBe(false);

      expect(component.find(Button).at(2).parent().hasClass('push-half--right')).toBe(false);
      expect(component.find(Button).at(2).parent().hasClass('push-half--left')).toBe(false);
    });
  });

  describe('with both left and right buttons supplied', () => {
    it('should render correct number of buttons if buttons are supplied', () => {
      const component = mount(
        <ButtonRow
          testSection="buttonRowTest"
          leftGroup={ [
            <Button key="1" style="plain">Button</Button>,
          ] }
          rightGroup={ [
            <Button key="1" style="plain">Button</Button>,
          ] }
        />
      );

      expect(component.find('[data-test-section="buttonRowTest-left"] button').length).toBe(1);
      expect(component.find('[data-test-section="buttonRowTest-right"] button').length).toBe(1);
    });

    describe('with a test section', () => {
      it('should render with a test section', () => {
        const component = mount(
          <ButtonRow
            testSection="buttonRowTest"
            leftGroup={ [
              <Button key="1" style="plain">Button</Button>,
            ] }
            centerGroup={ [
              <Button key="1" style="plain">Button</Button>,
            ] }
            rightGroup={ [
              <Button key="1" style="plain">Button</Button>,
            ] }
          />
        );

        expect(component.find('[data-test-section="buttonRowTest"]').length).toBe(1);
        expect(component.find('[data-test-section="buttonRowTest-left"]').length).toBe(1);
        expect(component.find('[data-test-section="buttonRowTest-center"]').length).toBe(1);
        expect(component.find('[data-test-section="buttonRowTest-right"]').length).toBe(1);
      });
    });
  });
});
