import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';

import Input from './index.js';

const stories = storiesOf('Input', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Input with knobs', (() => {
    return (
      <Input
        defaultValue={ text('defaultValue', 'some default value') }
        displayError={ boolean('displayError', false) }
        id="input-01"
        isFilter={ boolean('isFilter', false) }
        isDropdown={ boolean('isDropdown', true) }
        isOptional={ boolean('isOptional', false) }
        label={ text('Label', '') }
        max={ number('max', 50) }
        maxLength={ number('maxLength', 250) }
        min={ number('min', 10) }
        onChange={ action('on change') }
        onBlur={ action('on blur') }
        onKeyDown={ action('on key press') }
        placeholder={ text('placeholder', 'just a placeholder') }
        isRequired={ boolean('isRequired', false) }
        type={ select('type', ['text', 'password', 'number', 'date'], 'text') }
      />);
  })).add('Inputs', () => {
    return (
      <div>
        <fieldset>
          <Input
            id="input-01"
            label="Field label"
            note="A short description or note about this field."
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-02"
            label="Label for required field"
            isRequired={ true }
            note="A short description or note about this field."
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-03"
            label="Field label"
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-04"
            note="A short description or note about this field."
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-05"
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-06"
            placeholder="Has an error"
            type="text"
            displayError={ true }
          />
        </fieldset>
      </div>);
  }).add('Error states', () => {
    return (
      <div>
        <fieldset>
          <Input
            id="input-01"
            label="Field label"
            displayError={ true }
            note="A short description or note about this field."
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-02"
            label="Field label"
            displayError={ true }
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-03"
            displayError={ true }
            note="A short description or note about this field."
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
        <fieldset>
          <Input
            id="input-04"
            displayError={ true }
            placeholder="Just a placeholder"
            type="text"
          />
        </fieldset>
      </div>);
  });
