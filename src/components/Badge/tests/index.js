import React from 'react';
import Badge from '../index';
import { shallow } from 'enzyme';

describe('components/Badge', () => {
  it('should render text passed in as children', () => {
    const message = 'Published';
    const component = shallow(
      <Badge>{ message }</Badge>
    );

    expect(component.text()).toBe(message);
  });

  it('should add classes to the badge', () => {
    const component = shallow(
      <Badge color="draft">Unchanged</Badge>
    );

    expect(component.hasClass('oui-badge')).toBe(true);
    expect(component.hasClass('oui-badge--draft')).toBe(true);
  });

  it('should have a properly set test section', () => {
    const component = shallow(
      <Badge testSection="foo">Unchanged</Badge>
    );

    expect(component.is('[data-test-section="foo"]')).toBe(true);
  });
});
