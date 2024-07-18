import React from 'react';
import {
  Accordion,
  AccordionSection,
} from '../index';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/Accordion', () => {
  describe('AccordionSection', () => {
    it('should render a `li` HTML element', () => {
      const component = shallow(
        <AccordionSection
          title="Hello">
          World!
        </AccordionSection>
      );
      expect(component.is('li')).toBe(true);
    });

    it('renders the title and text', () => {
      const title = 'Awesome Title';
      const text = 'Hello, World!';
      const component = mount(
        <AccordionSection
          title={ title }>
          {text}
        </AccordionSection>
      );
      expect(component.props().title).toBe(title);
      expect(component.find('.accordion__content-wrap').text()).toBe(text);
    });
  });

  it('should render a `ul` HTML element with the right classes', () => {
    const component = shallow(
      <Accordion>
        <AccordionSection
          title="Hello">
          World!
        </AccordionSection>
      </Accordion>
    );
    expect(component.is('ul')).toBe(true);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('should only render React Components', function() {
    const component = shallow(
      <Accordion>
        <AccordionSection
          title="Section 1">
          Section 1 Text
        </AccordionSection>
        Hello
      </Accordion>
    );
    expect(component.children().length).toBe(1);
  });

  it('should update the internal state when different AccordionSections are clicked', () => {
    const component = mount(
      <Accordion>
        <AccordionSection
          title="Section 1">
          Section 1 Text
        </AccordionSection>
        <AccordionSection
          title="Section 2">
          Section 2 Text
        </AccordionSection>
      </Accordion>
    );
    expect(component.find(AccordionSection).at(0).props()._isSelected).toBe(true);

    component.find(AccordionSection).at(1).find('.accordion__link').simulate('click');

    expect(component.find(AccordionSection).at(0).props()._isSelected).toBe(false);
    expect(component.find(AccordionSection).at(1).props()._isSelected).toBe(true);
  });
});

