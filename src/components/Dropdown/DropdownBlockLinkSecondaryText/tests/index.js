import React from 'react';
import DropdownBlockLinkSecondaryText from '../index';
import { shallow } from 'enzyme';

describe('components/Dropdown/DropdownBlockLinkSecondaryText', () => {
  it('should render as a `div`', () => {
    const component = shallow(<DropdownBlockLinkSecondaryText></DropdownBlockLinkSecondaryText>);
    expect(component.type()).toBe('div');
  });

  it('should render secondary text', () => {
    const component = shallow(<DropdownBlockLinkSecondaryText secondaryText={ 'foo' } />);
    expect(component.text()).toBe('foo');
  });

  it('should render with test section', () => {
    const component = shallow(<DropdownBlockLinkSecondaryText testSection="goose" />);
    expect(component.findWhere((n) => n.is('[data-test-section="block-link-description-goose"]')).exists()).toBe(true);
  });

  it('should not render a warning if not passed as a prop', () => {
    const component = shallow(<DropdownBlockLinkSecondaryText />);
    expect(component.find('Icon').exists()).toBe(false);
  });

  it('should render a warning', () => {
    const component = shallow(<DropdownBlockLinkSecondaryText isWarning={ true } />);
    expect(component.find('Icon').exists()).toBe(true);
    expect(component.find('Icon').prop('name')).toBe('exclamation');
  });
});
