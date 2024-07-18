import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Switch from './index.js';

const stories = storiesOf('Switch', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories.add('Default', (() => {
  return <Switch onClick={ action('clicked the switch') }/>;
}));

stories.add('Off', (() => {
  return <Switch checked={ false } onClick={ action('clicked the switch') }/>;
}));

stories.add('On', (() => {
  return <Switch checked={ true } onClick={ action('clicked the switch') }/>;
}));

stories.add('Disabled', (() => {
  return (
    <div>
      <Switch checked={ true } isDisabled={ true } onClick={ action('Checked') }/>
      <Switch checked={ false } isDisabled={ true } onClick={ action('Not checked') }/>
    </div>
  );
}));
