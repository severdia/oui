import React from 'react';
import Card from '../index';
import { shallow, mount } from 'enzyme';

describe('components/Card', () => {
  const title = 'Hello world card';
  const body = 'Basic content inside this card';
  const test = 'foo';
  const mockFunction = jest.fn();

  it('should render the title passed in', () => {
    const component = shallow(
      <Card title={ title } testSection={ test }>
        { body }
      </Card>
    );

    expect(component.find('[data-test-section="foo-title"]').text()).toBe(title);
  });

  it('should render text passed in as children', () => {
    const component = shallow(
      <Card title={ title } testSection={ test }>
        { body }
      </Card>
    );

    expect(component.find('[data-test-section="foo-body"]').text()).toBe(body);
  });

  it('should render element passed in as children', () => {
    const component = shallow(
      <Card title={ title } testSection={ test }>
        <span data-test-section="foo-body-inner">
          { body }
        </span>
      </Card>
    );

    expect(component.exists('[[data-test-section="foo-body-inner"]]')).toBe(true);
  });

  it('should not render dismiss button by default', () => {
    const component = mount(
      <Card title={ title } testSection={ test }>
        { body }
      </Card>
    );

    expect(component.find('[data-test-section="foo-close"]').length).toBe(0);
  });

  it('should render dismiss button when prop is provided', () => {
    const component = mount(
      <Card title={ title } testSection={ test } onClose={ mockFunction }>
        { body }
      </Card>
    );

    expect(component.find('[data-test-section="foo-close"]').length).toBe(1);
  });

});
