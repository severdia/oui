import React from 'react';
import Attention from '../index';
import { shallow, mount } from 'enzyme';

describe('components/Attention', () => {

  it('should render text passed in as children', () => {
    const message = 'Hello! This is a short attention bar.';

    const component = shallow(
      <Attention>
        { message }
      </Attention>
    );

    expect(component.text()).toBe(message);
  });

  it('should render dismiss button when prop is provided', () => {
    const component = mount(
      <Attention
        isDismissible={ true }
        testSection="foo">
        'Hello! This is a short attention bar.'
      </Attention>
    );

    expect(component.find('[data-test-section="foo-dismiss"]').length).toBe(1);
  });

  it('should not render dismiss button by default', () => {
    const component = mount(
      <Attention
        testSection="attention">
        'Hello! This is a short attention bar.'
      </Attention>
    );

    expect(component.find('[data-test-section="foo-dismiss"]').length).toBe(0);
  });

  it('should have a properly set role attribute', () => {
    const component = shallow(
      <Attention>
        'Hello! This is a short attention bar.'
      </Attention>
    );

    expect(component.is('[role="alert"]')).toBe(true);
  });

  it('should have aria-label if type is provided', () => {
    const component = shallow(
      <Attention type="brand">
        'Hello! This is a short attention bar.'
      </Attention>
    );

    expect(component.is('[aria-label]')).toBe(true);
  });

  /**
   * Dismissible Attention components should use button element since it
   * triggers an action instead of navigating elsewhere.
   */
  it('should use an HTML button element for a close button', () => {
    const component = mount(
      <Attention
        isDismissible={ true }
        testSection="foo">
        'Hello! This is a short attention bar.'
      </Attention>
    );

    expect(component.find('button[data-test-section="foo-dismiss"]').length).toBe(1);
  });

  it('should have a properly set test section', () => {
    const component = shallow(
      <Attention testSection="foo">
        'Hello! This is a short attention bar.'
      </Attention>
    );

    expect(component.is('[data-test-section="foo"]')).toBe(true);
  });
});
