import React from 'react';
import Token from '../index';
import Icon from 'react-oui-icons';
import { shallow } from 'enzyme';

describe('components/Token', () => {
  const mockFunction = jest.fn();
  it('should render `DismissButton` when `isDismissible` is true and `onDismiss is provided`', () => {
    const component = shallow(
      <Token
        isDismissible={ true }
        onDismiss={ mockFunction }
        name="Goose"
      />
    );
    expect(component.find('DismissButton').length).toBe(1);
  });

  it('should not render `DismissButton` when `isDismissible` is not provided', () => {
    const component = shallow(<Token name="Goose" />);
    expect(component.find('DismissButton').length).toBe(0);
  });

  it('should not render `DismissButton` if `isDismissible` is true but `onDismiss` is falsy', () => {
    const component = shallow(<Token name="Goose" isDismissible={ true } />);
    expect(component.find('DismissButton').length).toBe(0);
  });

  it('should not render `DismissButton` if `onDismiss` is provided but `isDismissible` is false', () => {
    const component = shallow(
      <Token
        name="Goose"
        isDismissible={ false }
        onDismiss={ mockFunction }
      />
    );
    expect(component.find('DismissButton').length).toBe(0);
  });

  it('should render correct prop for `style` when not specified', () => {
    const component = shallow(<Token name="Goose" />);
    expect(component.find('.oui-token--secondary').length).toBe(1);
    expect(component.find('.oui-token--primary').length).toBe(0);
  });

  it('should render correct prop for `style` when specified', () => {
    const component = shallow(<Token style="primary" name="Goose" />);
    expect(component.find('.oui-token--primary').length).toBe(1);
    expect(component.find('.oui-token--secondary').length).toBe(0);
  });

  it('should properly display name on token passed down by props', () => {
    const component = shallow(<Token name="goose" />);
    expect(component.text()).toBe('goose');
  });

  it('should display description on token when provided', () => {
    const component = shallow(<Token name="goose" description="testdescription" />);
    expect(component.text()).toContain('testdescription');
  });

  it('should apply `oui-token-tool` class if token is draggable', () => {
    const component = shallow(<Token name="goose" isDraggable={ true } />);
    expect(component.find('.oui-token-tool').length).toBe(1);
  });

  it('should not apply `oui-token-tool` class if token is not draggable', () => {
    const component = shallow(<Token name="goose" isDraggable={ false } />);
    expect(component.find('.oui-token-tool').length).toBe(0);
  });

  it('should show number indicating order if provided', () => {
    const component = shallow(<Token name="goose" order={ 12345 } />);
    expect(component.text()).toContain(12345);
  });

  it('should not show number indicating order if not provided', () => {
    const component = shallow(<Token name="goose" />);
    expect(component.text()).not.toContain(12345);
  });

  it('should show ellipsis icon if the token is draggable', () => {
    const component = shallow(<Token name="goose" isDraggable={ true } />);
    expect(component.find(Icon).length).toBe(1);
  });

  it('should not show ellipsis icon if the token is not draggable', () => {
    const component = shallow(<Token name="goose" isDraggable={ false } />);
    expect(component.find(Icon).length).toBe(0);
  });

  it('should have a properly set test section', () => {
    const component = shallow(<Token testSection="goose" name="Goose" />);
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });

  it('should apply `oui-token-wrap--snug` class if token has a snug wrap', () => {
    const component = shallow(<Token name="goose" hasSnugWrap={ true } />);
    expect(component.find('.oui-token-wrap--snug').length).toBe(1);
  });

  it('should apply `oui-token-wrap` class if token wrap is not specified', () => {
    const component = shallow(<Token name="goose" />);
    expect(component.find('.oui-token-wrap').length).toBe(1);
  });

  it('should not apply `oui-token-wrap` class if token does not have a wrap', () => {
    const component = shallow(<Token name="goose" hasWrap={ false }/>);
    expect(component.find('.oui-token-wrap').length).toBe(0);
  });

});
