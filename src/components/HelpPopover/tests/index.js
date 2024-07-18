import React from 'react';
import HelpPopover from '../index.js';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe.only('components/HelpPopover', () => {
  it('renders correctly', () => {
    const component = shallow(<HelpPopover popoverTitle="I am a popover title!">I am a popover description.</HelpPopover>);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should render text passed in as children and with default props', function() {
    const message = 'Hello! This is a short popover with no title, just the defaults.';
    const component = mount(
      <HelpPopover>{ message }</HelpPopover>
    );
    const overlayWrapper = component.find('OverlayWrapper');
    expect(overlayWrapper.length).toBe(1);
    expect(overlayWrapper.props().behavior).toBe('click');
    expect(overlayWrapper.props().isConstrainedToScreen).toBe(true);
    expect(overlayWrapper.props().testSection).toBe('help-popover');

    const popover = component.find('Popover');
    expect(popover.length).toBe(1);
    expect(popover.props().title).toBe(undefined);
    expect(popover.props().children).toBe(message);
  });

  it('should render custom props properly', function() {
    const child = (
      <p>
        I am some random popover content. 🤓
      </p>
    );

    const component = mount(
      <HelpPopover
        behavior="hover"
        testSection="custom-test-section"
        popoverTitle="I am a title">
        { child }
      </HelpPopover>
    );
    const overlayWrapper = component.find('OverlayWrapper');
    expect(overlayWrapper.length).toBe(1);
    expect(overlayWrapper.props().behavior).toBe('hover');

    const popover = component.find('Popover');
    expect(popover.length).toBe(1);
    expect(popover.props().title).toBe('I am a title');
    expect(popover.props().children).toBe(child);
  });
});
