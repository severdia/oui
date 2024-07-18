import OverlayWrapper from '../index';
import Popover from '../../Popover';
import PropTypes from 'prop-types';
import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { waitForSelector } from '../../../utils/poll';

const TestButton = (props) => <button>{ props.text }</button>;
const TestPopover = (props) => {
  return (
    <Popover title="Lorem ipsum dolor sit amet">
      <p>Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae nihil libero et, hic!</p>
    </Popover>
  );
};

TestButton.propTypes = {
  text: PropTypes.string,
};


// Set in mountComponentAndSubscribeToBodyReady, this can be used
// to ensure the body exists
let tetherReadyPromise;

// Create helper function to mount the component and return
// a promise that will resolve when the body is ready because
// <OverlayWrapper/> will do the same before it initializes tether
const mountComponentAndSubscribeToBodyReady = (componentConfig) => {
  const componentInstance = mount(componentConfig);
  tetherReadyPromise = waitForSelector('body');
  return componentInstance;
};

describe('components/OverlayWrapper when componentDidMount', () => {
  beforeEach(() => {
    spyOn(OverlayWrapper.prototype, 'createTether').and.callThrough();
  });

  afterEach(() => {
    OverlayWrapper.prototype.createTether.calls.reset();
  });

  it('should call function to disable Tether', () => {
    const component = mountComponentAndSubscribeToBodyReady(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='just a button' />
      </OverlayWrapper>
    );

    const instance = component.instance();
    spyOn(instance, 'disableTether');
    const initialCallCount = instance.disableTether.calls.count();

    return tetherReadyPromise.then(() => {
      expect(instance.disableTether.calls.count()).toBe(initialCallCount + 1);
    });
  });

  it('should pass the correct options when all the layout props are provided', () => {
    const component = mountComponentAndSubscribeToBodyReady(
      <OverlayWrapper
        attachmentConstraint="none"
        overlay={ <TestPopover /> }
        horizontalAttachment="center"
        verticalAttachment="top"
        verticalTargetAttachment="top"
        horizontalTargetAttachment="center"
        isConstrainedToScreen={ true }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    return tetherReadyPromise.then(() => {
      const tetherOptions = OverlayWrapper.prototype.createTether.calls.mostRecent().args[0];
      expect(tetherOptions.attachment).toBe('top center');
      expect(tetherOptions.constraints.length).toBe(1);
      expect(tetherOptions.constraints[0]).toEqual({
        attachment: 'none',
        to: 'window',
        pin: true,
      });
      expect(tetherOptions.targetAttachment).toBe('top center');
      expect(tetherOptions.target.tagName.toLowerCase()).toBe(component.find(TestButton).render().first()[0].name);
      expect(tetherOptions.element.tagName.toLowerCase()).toBe(component.find(TestPopover).render().first()[0].name);
    });
  });
});

describe('components/OverlayWrapper when componentWillUnmount', () => {
  let component;
  let instance;

  beforeEach(() => {
    component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }
        horizontalAttachment="center"
        verticalAttachment="top"
        verticalTargetAttachment="top"
        horizontalTargetAttachment="center"
        isConstrainedToScreen={ true }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    instance = component.instance();
  });

  afterEach(() => {
    component = null;
    instance = null;
  });

  it('should destroy Tether', () => {
    spyOn(instance._tether, 'destroy');

    const initialCallCount = instance._tether.destroy.calls.count();

    component.unmount();
    expect(instance._tether.destroy.calls.count()).toBe(initialCallCount + 1);
  });

  it('should call `removeBodyEventListner` function', () => {
    spyOn(instance, 'removeBodyEventListner');

    const initialCallCount = instance.removeBodyEventListner.calls.count();

    component.unmount();
    expect(instance.removeBodyEventListner.calls.count()).toBe(initialCallCount + 1);
  });
});

describe('#disableTether', () => {
  it('should call function to remove event listner from document body', () => {
    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const instance = component.instance();
    spyOn(instance, 'removeBodyEventListner');

    const initialCallCount = instance.removeBodyEventListner.calls.count();

    instance._tether = { disable: () => {} };
    instance.disableTether();

    expect(instance.removeBodyEventListner.calls.count()).toBe(initialCallCount + 1);
  });

  it('should call `onHide` prop if a function is provided', () => {
    const obj = { func: () => {} };
    spyOn(obj, 'func').and.stub();

    mountComponentAndSubscribeToBodyReady(
      <OverlayWrapper
        overlay={ <TestPopover /> }
        onHide={ obj.func }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const initialCallCount = obj.func.calls.count();

    return tetherReadyPromise.then(() => {
      expect(obj.func.calls.count()).toBe(initialCallCount + 1);
    });
  });

  it('should set visible state of `overlay` to false', () => {
    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    component.setState({ isOverlayOpen: true });

    const instance = component.instance();

    instance._tether = { disable: () => {} };
    instance.disableTether();

    expect(component.state('isOverlayOpen')).toBe(false);
  });

});

describe('#enableTether', () => {
  it('should add click event listner to document if `shouldHideOnClick` is true', () => {
    spyOn(document, 'addEventListener');

    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }
        shouldHideOnClick={ true }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const instance = component.instance();

    instance._tether = { enable: () => {} };
    instance.enableTether();

    expect(document.addEventListener.calls.any()).toBe(true);
    expect(instance._bodyClickListener).toBeTruthy();
    expect(document.addEventListener.calls.argsFor(0)[0]).toBe('click');
    expect(document.addEventListener.calls.argsFor(0)[1]).toBe(instance._bodyClickListener);
  });

  it('should not add click event listner to document if `shouldHideOnClick` is false', () => {
    spyOn(document, 'addEventListener');

    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }
        shouldHideOnClick={ false }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const instance = component.instance();

    instance._tether = { enable: () => {} };
    instance.enableTether();

    expect(instance._bodyClickListener).toBe(false);
    expect(document.addEventListener.calls.argsFor(0)[0]).not.toBe('click');
    expect(document.addEventListener.calls.argsFor(0)[1]).not.toBe(instance._bodyClickListener);
  });

  it('should add keyup event listner to document', () => {
    spyOn(document, 'addEventListener');

    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const instance = component.instance();

    instance._tether = { enable: () => {} };
    instance.enableTether();

    expect(document.addEventListener.calls.any()).toBe(true);
    expect(document.addEventListener.calls.argsFor(1)[0]).toBe('keyup');
    expect(document.addEventListener.calls.argsFor(1)[1]).toBe(instance._documentEscapeListener);
  });

  it('should call `onShow` prop if a function is provided', () => {
    const obj = { func: () => {} };
    spyOn(obj, 'func').and.stub();

    const component = mountComponentAndSubscribeToBodyReady(
      <OverlayWrapper
        overlay={ <TestPopover /> }
        onShow={ obj.func }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const instance = component.instance();
    const initialCallCount = obj.func.calls.count();

    return tetherReadyPromise.then(() => {
      instance.enableTether();
      expect(obj.func.calls.count()).toBe(initialCallCount + 1);
    });
  });


  it('should set visible state of `overlay` to true', () => {
    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    component.setState({ isOverlayOpen: false });
    const instance = component.instance();
    instance._tether = { enable: () => {} };
    instance.enableTether();

    expect(component.state('isOverlayOpen')).toBe(true);
  });
});

describe('#isClickWithinOverlayOrChildren', () => {
  it('should call function to disable Tether if click is not within overlay or button', () => {
    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const instance = component.instance();
    spyOn(instance, 'disableTether');
    const initialCallCount = instance.disableTether.calls.count();

    instance.isClickWithinOverlayOrChildren({ target: document.body });

    expect(instance.disableTether.calls.count()).toBe(initialCallCount + 1);
  });
});

describe('#onChildClick', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );
  });

  afterEach(() => {
    component.unmount();
    component = null;
  });

  it('should still call `children`\'s existing `onClick` if it exists', () => {
    const instance = component.instance();
    const fakeEvent = {};
    const fakeChild = { props: { onClick: () => {} } };

    spyOn(fakeChild.props, 'onClick');

    instance.onChildClick(fakeEvent, fakeChild);

    // Expect that `fakeChild`'s `onClick` was called and `fakeEvent` was
    // passed in
    expect(fakeChild.props.onClick.calls.count()).toBe(1);
    expect(fakeChild.props.onClick.calls.mostRecent().args[0]).toBe(fakeEvent);
  });

  it('should call functions to enable Tether when clicking on the children and overlay is closed', () => {
    const instance = component.instance();
    spyOn(instance, 'enableTether');
    const initialCallCount = instance.enableTether.calls.count();

    component.setState({ 'isOverlayOpen': false });

    instance.onChildClick(null, { props: {} });

    // Should call function to enable Tether
    expect(instance.enableTether.calls.count()).toBe(initialCallCount + 1);
  });

  it('should call functions to disable Tether when clicking on the children and overlay is open', () => {
    const instance = component.instance();
    spyOn(instance, 'disableTether');
    const initialCallCount = instance.disableTether.calls.count();

    component.setState({ 'isOverlayOpen': true });

    instance.onChildClick(null, { props: {} });

    // Should call function to disable Tether
    expect(instance.disableTether.calls.count()).toBe(initialCallCount + 1);
  });
});

describe('#onEscapeKey', () => {
  it('should call function to disable Tether when escape key is pressed', () => {
    const component = mount(
      <OverlayWrapper
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );

    const instance = component.instance();
    spyOn(instance, 'disableTether');
    const fakeEvent = { keyCode: 27 };

    instance.onEscapeKey(fakeEvent);

    expect(instance.disableTether.calls.count()).toBe(1);
  });
});

describe('components/OverlayWrapper snapshots & others', () => {
  it('should render a Popover component inside', () => {
    const component = mount(
      <OverlayWrapper
        behavior="click"
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render component with `state.isOverlayOpen=true` when click if click bahavior', () => {
    const component = mountComponentAndSubscribeToBodyReady(
      <OverlayWrapper
        behavior="click"
        overlay={ <TestPopover /> }>
        <TestButton text='button' />
      </OverlayWrapper>
    );
    return tetherReadyPromise.then(() => {
      component.find('.click-area').simulate('click');
      expect(component.state().isOverlayOpen).toBe(true);
    });
  });
  it('should render component with `state.isOverlayOpen=true` when hover if hover behavior', () => {
    const component = mountComponentAndSubscribeToBodyReady(
      <OverlayWrapper
        behavior="hover"
        overlay={ <TestPopover /> }
        shouldHideOnClick={ true }>
        <TestButton text='button' />
      </OverlayWrapper>
    );
    return tetherReadyPromise.then(() => {
      component.find('.click-area').simulate('mouseover');
      expect(component.state().isOverlayOpen).toBe(true);
    });
  });

  it('should render component with `state.isOverlayOpen=false` when clicking escape key', () => {
    const component = mount(
      <OverlayWrapper
        behavior="hover"
        overlay={ <TestPopover /> }
        shouldHideOnClick={ true }>
        <TestButton text='button' />
      </OverlayWrapper>
    );
    component.find('.click-area').simulate('click');
    component.simulate('keyDown', { keyCode: 40 });
    expect(component.state().isOverlayOpen).toBe(false);
  });

  it('should call prop function on click', () => {
    const component = mount(
      <OverlayWrapper
        behavior="hover"
        overlay={ <TestPopover /> }
        shouldHideOnClick={ true }>
        <TestButton text='button' />
      </OverlayWrapper>
    );
    component.find('.click-area').simulate('click');
    component.simulate('keyDown', { keyCode: 40 });
    expect(component.state().isOverlayOpen).toBe(false);
  });

});
