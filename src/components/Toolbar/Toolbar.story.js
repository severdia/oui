import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Toolbar from './index.js';

const stories = storiesOf('Toolbar', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => (<div>
    <Toolbar>
      <Toolbar.Left>
        <Toolbar.Link
          href={ 'www.google.com' }
          label='Link'
        />
      </Toolbar.Left>
      <Toolbar.Right>
        <Toolbar.Link
          isDisabled={ true }
          href={ 'www.google.com' }
          label='Disabled Link'
        />
        <Toolbar.Link
          href={ 'www.google.com' }
          label='Enabled Link'
        />
        <Toolbar.Button
          onClick={ action('Saying hi!') }
          label='Button'
        />
      </Toolbar.Right>
    </Toolbar>
  </div>)));
