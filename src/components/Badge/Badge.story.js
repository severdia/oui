import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';

import Badge from './index.js';

const stories = storiesOf('Badge', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('All badges', () => (<div>
    <Badge color="default">Default</Badge>
    <Badge color="draft">Draft</Badge>
    <Badge color="live">Live</Badge>
    <Badge color="primary">Primary</Badge>
    <Badge color="plain">Plain</Badge>
    <Badge color="bad-news">Bad News</Badge>
  </div>))
  .add('With text', (() => (<div className="flex flex-align--center">
    <Badge color="draft">1</Badge>{ text('text', 'Unpublished Change') }
  </div>)
  ))
  .add('With numbers', () => (<div>
    <Badge color="draft">{ number('draft number', 9) }</Badge>
    <Badge color="live">{ number('light number', 9) }</Badge>
  </div>)
  );
