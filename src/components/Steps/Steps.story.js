import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Steps from './index.js';

const stories = storiesOf('Steps', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

const items = [
  {
    label: 'Cat',
    value: 'cat',
  },
  {
    label: 'Dog',
    value: 'dog',
  },
  {
    label: 'Bear',
    value: 'bear',
  },
  {
    label: 'Squirrel',
    value: 'squirrel',
  },
];

stories.add('Default', (() => {
  return (
    <Container>
      <Steps
        items={ items }
        currentStep={ 'bear' }
        onClick={ action('Stage clicked') }
      />
    </Container>
  );
})).add('User cannot edit', (() => {
  return (
    <Container>
      <Steps
        items={ items }
        currentStep={ 'bear' }
        onClick={ action('Stage clicked') }
        userCanEdit={ false }
      />
    </Container>
  );
}));

const Container = styled.div`
  height: 100vh;
  width: 300px;
`;
