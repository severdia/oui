import React from 'react';
import ProgressBar from '../index';
import { shallow, mount } from 'enzyme';

describe('components/ProgressBar', () => {
  it('should render a progressbar with a top label', () => {
    const component = mount(
      <ProgressBar
        topLabel="this is a top label"
      />
    );

    expect(component.props().topLabel).toEqual('this is a top label');
  });

  it('should render a progressbar with left and right bottom ', () => {
    const component = mount(
      <ProgressBar
        leftLabel="this is a left bottom label"
      />
    );

    expect(component.props().leftLabel).toEqual('this is a left bottom label');
  });

  it('should render a progressbar with left and right bottom label', () => {
    const component = mount(
      <ProgressBar
        rightLabel="this is a right bottom label"
      />
    );

    expect(component.props().rightLabel).toEqual('this is a right bottom label');
  });

  it('should render a progressbar with prop min equal to 0', () => {
    const component = mount(
      <ProgressBar
        min="0"
      />
    );

    expect(component.props().min).toEqual('0');
  });
  it('should render a progressbar with prop max equals to 100', () => {
    const component = mount(
      <ProgressBar
        max="100"
      />
    );

    expect(component.props().max).toEqual('100');
  });
  it('should render a progressbar with progress prop equal to 60', () => {
    const component = mount(
      <ProgressBar
        progress="60"
      />
    );

    expect(component.props().progress).toEqual('60');
  });
  it('should render a progressbar with min, max and progress props', () => {
    const component = mount(
      <ProgressBar
        progress="60"
      />
    );

    expect(component.props().progress).toEqual('60');
  });
  it('should render a progressbar with error have displayError set to true', () => {
    const component = mount(
      <ProgressBar
        displayError={ true }
      />
    );

    expect(component.props().displayError).toEqual(true);
  });
  it('should render text based on progress prop', () => {
    const component = shallow((
      <ProgressBar
        displayError={ true }
        progress="60"
      />
    ));
    expect(component.text()).toEqual('60%');
  });
  it('should render text for bottom labels and not in the bar', () => {
    const component = shallow((
      <ProgressBar
        displayError={ true }
        progress="60"
        leftLabel="left label"
        rightLabel="right label"
      />
    ));
    expect(component.text()).toEqual('left label: 60%right label: 40%');
  });
});


