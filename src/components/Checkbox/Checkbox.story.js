import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import Checkbox from '../Checkbox';

const stories = storiesOf('Checkbox', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('With string label', (() => {
    return (
      <Checkbox
        defaultChecked={ true }
        label={ text('label', 'checkbox component') }
        isDisabled={ boolean('isDisabled', false) }
      />
    );
  }))
  .add('With html label', (() => {
    return (
      <Checkbox
        defaultChecked={ true }
        label={
          <div>
            <strong>Label</strong>
            <br />
            <span>Description text</span>
          </div>
        }
        isDisabled={ boolean('isDisabled', false) }
      />
    );
  }))
  .add('With labelWeight', (() => {
    return (
      <Checkbox
        defaultChecked={ true }
        label={ text('label', 'checkbox component') }
        labelWeight={ select('labelWeight', ['light', 'normal', 'bold'], 'bold') }
        isDisabled={ boolean('isDisabled', false) }
      />
    );
  }));
