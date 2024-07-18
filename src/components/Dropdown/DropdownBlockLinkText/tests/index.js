import React from 'react';
import DropdownBlockLinkText from '../index';
import { shallow } from 'enzyme';

describe('components/Dropdown/DropdownBlockLinkText', () => {
  it('should render as a `span`', () => {
    const component = shallow(<DropdownBlockLinkText></DropdownBlockLinkText>);
    expect(component.type()).toBe('span');
  });

  it('should render text', () => {
    const component = shallow(<DropdownBlockLinkText text='foo' />);
    expect(component.text()).toBe('foo');
  });

  it('should render with test section', () => {
    const component = shallow(<DropdownBlockLinkText testSection="goose"></DropdownBlockLinkText>);
    expect(component.is('[data-test-section="block-link-text-goose"]')).toBe(true);
  });
});
