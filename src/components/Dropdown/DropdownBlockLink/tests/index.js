import React from 'react';
import DropdownBlockLink from '../index';
import { shallow } from 'enzyme';

describe('components/Dropdown/DropdownBlockLink', () => {
  it('should render as a `div`', () => {
    const component = shallow(<DropdownBlockLink></DropdownBlockLink>);
    expect(component.type()).toBe('div');
  });

  it('should render children', () => {
    const component = shallow(<DropdownBlockLink>foo</DropdownBlockLink>);
    expect(component.text()).toBe('foo');
  });

  it('should render with test section', () => {
    const component = shallow(<DropdownBlockLink testSection="goose"></DropdownBlockLink>);
    expect(component.is('[data-test-section="goose"]')).toBe(true);
  });

  it('should render with a track id', () => {
    const component = shallow(<DropdownBlockLink trackId="goose"></DropdownBlockLink>);
    expect(component.is('[data-track-id="goose"]')).toBe(true);
  });

  it('should render with a min width', () => {
    const component = shallow(<DropdownBlockLink minWidth="300px"></DropdownBlockLink>);
    expect(component.prop('style')).toEqual({ minWidth: '300px' });
  });

  it('should render with link styling by default', () => {
    const component = shallow(<DropdownBlockLink></DropdownBlockLink>);
    expect(component.prop('className')).toEqual('link oui-dropdown__block-link');
  });

  it('should render with link styling if prop passed as true', () => {
    const component = shallow(<DropdownBlockLink isLink={ true }></DropdownBlockLink>);
    expect(component.prop('className')).toEqual('link oui-dropdown__block-link');
  });

  it('should render with link styling if prop passed as false', () => {
    const component = shallow(<DropdownBlockLink isLink={ false }></DropdownBlockLink>);
    expect(component.prop('className')).toEqual('isSelected');
  });

  it('should call function that is passed in as `onClick` after click', () => {
    const obj = { func: () => {} };
    spyOn(obj, 'func').and.stub();

    const component = shallow(
      <DropdownBlockLink onClick={ obj.func }>Hello!</DropdownBlockLink>
    );

    component.simulate('click');

    expect(obj.func).toHaveBeenCalled();
  });
});
