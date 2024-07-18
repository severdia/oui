import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import ProgressDots from './index.js';

const stories = storiesOf('ProgressDots', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories.add('Default', (() => {
  return <ProgressDots testSection="test-progress-dots" />;
}));
