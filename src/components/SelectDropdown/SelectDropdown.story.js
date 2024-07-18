import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SelectDropdown from './index.js';

const stories = storiesOf('SelectDropdown', module);
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
    description: 'A small feline.',
    value: 'cat',
  },
  {
    label: 'Dog',
    value: 'dog',
  },
  {
    label: 'Bear',
    description: 'Likes honey',
    value: 'bear',
  },
  {
    label: 'Squirrel',
    description: 'Smarter than it looks',
    value: 'squirrel',
  },
];

stories.add('Default', (() => {

  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Initial placeholder', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        initialPlaceholder="Select a value..."
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Width of activator', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        onChange={ action('SelectDropdown value changed') }
        width={ '400px ' }
      />
    </Container>
  );
})).add('Display Error', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        displayError={ true }
        value={ 'bear' }
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('Width of dropdown', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        onChange={ action('SelectDropdown value changed') }
        minDropdownWidth={ '400px ' }
      />
    </Container>
  );
})).add('Disabled', (() => {
  return (
    <Container>
      <SelectDropdown
        items={ items }
        value={ 'dog' }
        minDropdownWidth={ '400px ' }
        isDisabled={ boolean('isDisabled', true) }
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
})).add('ActivatorLabel', (() => {
  const itemsWithActivatorLabel = [
    {
      activatorLabel: 'Production',
      label: 'Production (50%)',
      value: 'Production',
    },
    {
      activatorLabel: 'Staging',
      label: 'Staging (100%)',
      value: 'Staging',
    },
  ];
  return (
    <Container>
      <SelectDropdown
        items={ itemsWithActivatorLabel }
        value='Production'
        onChange={ action('SelectDropdown value changed') }
      />
    </Container>
  );
}));

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
`;
