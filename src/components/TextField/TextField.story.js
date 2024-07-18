import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs';

import TextField from './index.js';

const stories = storiesOf('TextField (deprecated)', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      <div className="attention attention--bad-news oui-text--center push-double--bottom">
        TextField component is deprecated. Please use Input instead for the same features.
      </div>
      {story()}
    </div>
  ));

stories
  .add('TextField with knobs', (() => {
    return (
      <TextField
        defaultValue={ text('defaultValue', 'some default value') }
        displayError={ boolean('displayError', false) }
        isFilter={ boolean('isFilter', false) }
        isOptional={ boolean('isOptional', false) }
        isRequired={ boolean('isRequired', false) }
        label={ text('Label', 'Use Input Component instead') }
        max={ number('max', 50) }
        min={ number('min', 10) }
        note={ text('note', '') }
        onChange={ action('on change') }
        onBlur={ action('on blur') }
        onKeyDown={ action('on key press') }
        placeholder={ text('placeholder', 'just a placeholder') }
        type={ select('type', ['text', 'password', 'number', 'date', 'percent'], 'text') }
      />);
  })).add('TextField', () => {
    return (
      <TextField
        label="Use Input Component instead"
        note="A short description or note about this field."
        placeholder="Just a placeholder"
        type="text"
      />);
  }).add('Percent', () => {
    return (
      <TextField
        label="Total Traffic Allocated:"
        placeholder="100"
        defaultValue={ text('defaultValue', '0') }
        type="percent"
        max={ number('max', 100) }
        min={ number('min', 0) }
      />);
  }).add('Error state', () => {
    return (
      <TextField
        label="Use Input Component instead"
        displayError={ true }
        note="Form error note."
        placeholder="Just a placeholder"
        type="text"
      />);
  });
