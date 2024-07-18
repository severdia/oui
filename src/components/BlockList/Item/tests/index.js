import React from 'react';
import Item from '../index';
import { shallow, mount } from 'enzyme';

describe('components/BlockList/Item', () => {
  describe('#render', () => {
    describe('`isDisabled` is provided', function() {
      let component;
      const text = 'Goose';
      const disabled = true;
      const notDisabled = false;

      it('should render children and render item in a `div` if `isDisabled` is true', function() {
        component = shallow(<Item isDisabled={ disabled }>{ text }</Item>);
        expect(component.find('.oui-block-list__item .pointer-events--none .background--faint .muted').text()).toBe(text);
        expect(component.find('.oui-block-list__item .pointer-events--none .background--faint .muted').is('div')).toBe(true);
      });

      it('should NOT render childen and render item in a `div` if `isDisabled` is false', function() {
        component = shallow(<Item isDisabled={ notDisabled }>{ text }</Item>);
        expect(component.find('.oui-block-list__item .pointer-events--none .background--faint .muted').exists()).toBeFalsy();
      });

      it('should render without sidepadding if `hardSides` is true', function() {
        component = shallow(<Item hardSides={ true }>{ text }</Item>);
        expect(component);

      });
    });

    describe('`onClick` is provided', () => {
      let component;
      const func = jest.fn();
      const text = 'Goose';

      beforeEach(() => {
        component = shallow(
          <Item onClick={ func }>{ text }</Item>
        );
      });

      it('should render children', () => {
        expect(component.find('.oui-block-list__item').text()).toBe(text);
      });

      it('should render item in a `div`', () => {
        expect(component.find('.oui-block-list__item').is('div')).toBe(true);
      });

      it('should pass `onClick`', () => {
        expect(component.find('.oui-block-list__item').prop('onClick')).toBe(func);
      });

      it('should provide function to handle `onKeyDown` event', () => {
        expect(typeof component.find('.oui-block-list__item').prop('onKeyDown')).toBe('function');
      });

      it('should add a `ref` so other functions can reference the node', () => {
        const mountedComponent = mount(<Item onClick={ func }>{ text }</Item>);
        expect(mountedComponent.instance()._itemWithOnClick).toBeTruthy();
      });
    });

    describe('`href` is provided', () => {
      const href = 'https://www.example.com/';
      const text = 'Goose';

      it('should render children', () => {
        const component = shallow(<Item href={ href }>{ text }</Item>);
        expect(component.find('.oui-block-list__item').text()).toBe(text);
      });

      it('should render item in a `a`', () => {
        const component = shallow(<Item href={ href }>{ text }</Item>);
        expect(component.find('.oui-block-list__item').is('a')).toBe(true);
      });

      it('should pass `href`', () => {
        const component = shallow(<Item href={ href }>{ text }</Item>);
        expect(component.find('.oui-block-list__item').prop('href')).toBe(href);
      });

      it('should pass `hrefTarget`', () => {
        const hrefTarget = '_blank';
        const component = shallow(
          <Item href={ href } hrefTarget={ hrefTarget }>{ text }</Item>
        );
        expect(component.find('.oui-block-list__item').prop('target')).toBe(hrefTarget);
      });

      it('should add `rel` attribute if `hrefTarget` is `_blank` for improved security', () => {
        const hrefTarget = '_blank';
        const component = shallow(
          <Item href={ href } hrefTarget={ hrefTarget }>{ text }</Item>
        );
        expect(component.find('.oui-block-list__item').prop('rel')).toBe('noopener noreferrer');
      });

      it('should not add `rel` attribute if `hrefTarget` is not `_blank`', () => {
        const hrefTarget = '_self';
        const component = shallow(
          <Item href={ href } hrefTarget={ hrefTarget }>{ text }</Item>
        );
        expect(component.find('.oui-block-list__item').prop('rel')).toBe(false);
      });

      it('should pass `hrefTitle`', () => {
        const hrefTitle = 'Duck';
        const component = shallow(
          <Item href={ href } hrefTitle={ hrefTitle }>{ text }</Item>
        );
        expect(component.find('.oui-block-list__item').prop('title')).toBe(hrefTitle);
      });
    });

    describe('neither `onClick` or `href` are provided', () => {
      let component;
      const text = 'Goose';

      beforeEach(() => {
        component = shallow(<Item>{ text }</Item>);
      });

      it('should render children', () => {
        expect(component.find('.oui-block-list__item').text()).toBe(text);
      });

      it('should render item in a `div`', () => {
        expect(component.find('.oui-block-list__item').is('div')).toBe(true);
      });
    });

    it('should properly set test section', () => {
      const component = shallow(<Item testSection="foo">Goose</Item>);
      expect(component.is('[data-test-section="foo"]')).toBe(true);
    });
  });

  describe('#_handleOnKeyDown', () => {
    describe('spacebar is pressed on the item', () => {
      let component;
      let instance;
      let validEvent;
      let spyObj;

      beforeEach(() => {
        spyObj = { func: () => {} };
        spyOn(spyObj, 'func').and.stub();

        component = shallow(<Item onClick={ spyObj.func }>Goose</Item>);
        instance = component.instance();
        instance._itemWithOnClick = 'fakeElement';
        validEvent = {
          keyCode: 32,
          target: instance._itemWithOnClick,
          preventDefault: () => {},
        };
      });

      it('should prevent default page scroll', () => {
        spyOn(validEvent, 'preventDefault');
        expect(validEvent.preventDefault.calls.count()).toBe(0);
        instance._handleOnKeyDown(validEvent);
        expect(validEvent.preventDefault.calls.count()).toBe(1);
      });

      it('should call function passed as `onClick`', () => {
        expect(spyObj.func.calls.count()).toBe(0);
        instance._handleOnKeyDown(validEvent);
        expect(spyObj.func.calls.count()).toBe(1);
      });
    });

    describe('non-spacebar keycode is passed on the correct element', () => {
      let component;
      let instance;
      let invalidEvent;
      let spyObj;

      beforeEach(() => {
        spyObj = { func: () => {} };
        spyOn(spyObj, 'func').and.stub();

        component = shallow(<Item onClick={ spyObj.func }>Goose</Item>);
        instance = component.instance();
        instance._itemWithOnClick = 'fakeElement';
        invalidEvent = {
          keyCode: 0, // Spacebar is 32
          target: instance._itemWithOnClick,
          preventDefault: () => {},
        };
      });

      it('should not prevent default page scroll', () => {
        spyOn(invalidEvent, 'preventDefault');
        instance._handleOnKeyDown(invalidEvent);
        expect(invalidEvent.preventDefault.calls.count()).toBe(0);
      });

      it('should not call function passed as `onClick`', () => {
        instance._handleOnKeyDown(invalidEvent);
        expect(spyObj.func.calls.count()).toBe(0);
      });
    });

    describe('spacebar is pressed on a child of the item, not the container', () => {
      let component;
      let instance;
      let invalidEvent;
      let spyObj;

      beforeEach(() => {
        spyObj = { func: () => {} };
        spyOn(spyObj, 'func').and.stub();

        component = shallow(<Item onClick={ spyObj.func }>Goose</Item>);
        instance = component.instance();
        instance._itemWithOnClick = 'fakeElement';
        invalidEvent = {
          keyCode: 32,
          target: 'notTheItem', // This should the function's conditional return false
          preventDefault: () => {},
        };
      });

      it('should not prevent default page scroll', () => {
        spyOn(invalidEvent, 'preventDefault');
        instance._handleOnKeyDown(invalidEvent);
        expect(invalidEvent.preventDefault.calls.count()).toBe(0);
      });

      it('should not call function passed as `onClick`', () => {
        instance._handleOnKeyDown(invalidEvent);
        expect(spyObj.func.calls.count()).toBe(0);
      });
    });
  });

  describe('onMouseDown is provided', () => {
    let component;
    let onMouseDownSpy;
    let testSection;
    beforeEach(() => {
      onMouseDownSpy = jest.fn();
      testSection = 'oui-blocklist-item';
      component = mount(
        <Item
          onMouseDown={ onMouseDownSpy }
          testSection={ testSection }>test</Item>
      );
    });

    afterEach(() => {
      component.unmount();
    });

    it('should call onMouseDown when an Item is mousedowned', () => {
      const divComponent = component.find(`[data-test-section="${testSection}"]`).childAt(0);
      divComponent.simulate('mousedown');
      expect(onMouseDownSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('gutters', function() {
    let component;
    let testSection;
    beforeEach(() => {
      testSection = 'oui-blocklist-item';
      component = mount(
        <Item
          gutters='tight'
          testSection={ testSection }>test</Item>
      );
    });

    afterEach(() => {
      component.unmount();
    });

    it('should not remove padding on sides of the item when gutters is not defined', () => {
      component = mount(
        <Item
          testSection={ testSection }>test</Item>
      );
      const divComponent = component.find(`[data-test-section="${testSection}"]`).childAt(0);
      expect(divComponent.hasClass('hard--sides')).toBe(false);
    });

    it('should not remove padding on sides of the item when gutters is "loose"', () => {
      component = mount(
        <Item
          gutters='loose'
          testSection={ testSection }>test</Item>
      );
      const divComponent = component.find(`[data-test-section="${testSection}"]`).childAt(0);
      expect(divComponent.hasClass('hard--sides')).toBe(false);
    });

    it('should remove padding on the sides of the item when gutters is "tight"', () => {
      component = mount(
        <Item
          gutters='tight'
          testSection={ testSection }>test</Item>
      );
      const divComponent = component.find(`[data-test-section="${testSection}"]`).childAt(0);
      expect(divComponent.hasClass('hard--sides')).toBe(true);
    });
  });

});
