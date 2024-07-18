import React from 'react';
import Code from '../index';
import { shallow, mount, render } from 'enzyme';

describe('components/Code', () => {
  it('should render inline code in code tag', () => {
    const component = shallow(
      <Code type="inline">{ 'var foo;' }</Code>
    );

    expect(component.type()).toBe('code');
  });

  it('should render block code as preformatted text', () => {
    const component = shallow(
      <Code type="block">{ 'var foo;' }</Code>
    );

    expect(component.children().type()).toBe('pre');
  });

  it('should render code that is passed in', () => {
    let code = 'var foo;';

    const componentInline = mount(
      <Code type="inline">{ code }</Code>
    );

    const componentBlock = mount(
      <Code type="block">{ code }</Code>
    );

    expect(componentInline.text()).toBe(code);
    expect(componentBlock.text()).toBe(code);
  });

  it('should not render if children are null', () => {
    const component = shallow(
      <Code type="block"></Code>
    );

    expect(component.html()).toBeFalsy();
  });

  it('should add syntax highlighting to code when specified', () => {
    let code = 'var foo;';

    const componentInline = render(
      <Code type="inline" isHighlighted={ true }>{ code }</Code>
    );

    const componentBlock = render(
      <Code type="block" isHighlighted={ true }>{ code }</Code>
    );

    expect(componentInline.find('[class^="hljs-"]').length).toBe(1);
    expect(componentBlock.find('[class^="hljs-"]').length).toBe(1);
  });

  it('should not add syntax highlighting by default', () => {
    let code = 'var foo;';

    const componentInline = mount(
      <Code type="inline">{ code }</Code>
    );

    const componentBlock = mount(
      <Code type="block">{ code }</Code>
    );

    expect(componentInline.find('[class^="hljs-"]').length).toBe(0);
    expect(componentBlock.find('[class^="hljs-"]').length).toBe(0);
  });

  it('should not add syntax highlighting if language is provided but highlighting is not requested', () => {
    let code = 'var foo;';

    const componentInline = mount(
      <Code type="inline" language="js">{ code }</Code>
    );

    const componentBlock = mount(
      <Code type="block" language="js">{ code }</Code>
    );

    expect(componentInline.find('[class^="hljs-"]').length).toBe(0);
    expect(componentBlock.find('[class^="hljs-"]').length).toBe(0);
  });

  it('should have a properly set test section', () => {
    const componentInline = shallow(
      <Code testSection="foo-inline" type="inline">Hello!</Code>
    );

    const componentBlock = shallow(
      <Code testSection="foo-block" type="block">Hello!</Code>
    );

    expect(componentInline.is('[data-test-section="foo-inline"]')).toBe(true);
    expect(componentBlock.find('[data-test-section="foo-block"]').length).toBe(1);
  });

  it('should not add a copy button by default', () => {
    let code = 'var foo;';

    const component = mount(
      <Code
        type="block"
        testSection="code">
        { code }
      </Code>
    );

    expect(component.find('[data-test-section="code-copy-button"]').length).toBe(0);
  });
});
