import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import Spinner from './index.js';

const stories = storiesOf('Spinner', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories.add('Default', (() => {
  return <Spinner data-test-section="test-spinner" />;
}));

stories.add('Smaller sizes', () => {
  return <Spinner size={ select('size', { small: 'small', tiny: 'tiny' }, 'small') } />;
});

stories.add('With overlay', () => {
  return (
    <div className="position--relative">
      <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non cum iusto repudiandae
      earum porro reprehenderit perspiciatis iste delectus ipsam, accusantium ad sunt,
      rem mollitia, omnis illum explicabo facere quibusdam qui.</div>
      <Spinner hasOverlay={ true } />
    </div>
  );
});
