import React from 'react';
import BlockList from '../index';
import { shallow } from 'enzyme';

describe('components/BlockList', () => {
  it('should render children', () => {
    const text = 'Hi!';
    const component = shallow(<BlockList>{ text }</BlockList>);
    expect(component.text()).toBe(text);
  });

  it('should properly set test section', () => {
    const component = shallow(<BlockList testSection="foo">Goose</BlockList>);
    expect(component.is('[data-test-section="foo"]')).toBe(true);
  });

  it('should add `border--all` when `hasBorder` is true', () => {
    const component = shallow(<BlockList testSection="foo" hasBorder={ true }>Goose</BlockList>);
    expect(component.hasClass('border--all')).toBe(true);
  });

  it('should not add `border--all` when `hasBorder` is true', () => {
    const component = shallow(<BlockList testSection="foo" hasBorder={ false }>Goose</BlockList>);
    expect(component.hasClass('border--all')).toBe(false);
  });

  it('should properly set `maxHeight` if provided', () => {
    const component = shallow(<BlockList maxHeight='300px'>Goose</BlockList>);
    expect(component.prop('style')).toMatchObject({ maxHeight: '300px' });
  });

  it('should not set `maxHeight` if not provided', () => {
    const component = shallow(<BlockList>Goose</BlockList>);
    expect(component.prop('style')).not.toMatchObject({ maxHeight: '300px' });
  });
});
