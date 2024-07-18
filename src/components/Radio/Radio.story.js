import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import Radio from './index.js';

const stories = storiesOf('Radio', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => {
    return (
      <Radio
        testSection={ text('testSection', 'test-radio') }
        name={ text('name', 'this is a radio') }
        label={ text('label', 'this is a radio') }
      />
    );
  }))
  .add('With html label', (() => {
    return (
      <Radio
        testSection={ text('testSection', 'test-radio') }
        name={ text('name', 'this is a radio') }
        label={
          <div>
            <strong>Label</strong>
            <br />
            <span>Description text</span>
          </div>
        }
      />
    );
  }))
  .add('With labelWeight prop', (() => {
    return (
      <Radio
        testSection={ text('testSection', 'test-radio') }
        name={ text('name', 'this is a radio') }
        label={ text('label', 'this is a radio') }
        labelWeight={ select('labelWeight', ['light', 'normal', 'bold'], 'bold') }
      />
    );
  }));
