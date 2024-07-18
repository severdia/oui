import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Autocomplete from './index.js';
import Link from '../Link';

const cityData = [
  { name: 'austin', population: '950,000' },
  { name: 'atlanta', population: '470,000' },
  { name: 'chicago', population: '2.7 million' },
  { name: 'boston', population: '670,000' },
  { name: 'denver', population: '690,000' },
  { name: 'detroit', population: '670,000' },
  { name: 'san jose', population: '1 million' },
  { name: 'san antonio', population: '1.5 million' },
  { name: 'san francisco', population: '880,000' },
  { name: 'st louis', population: '310,000' },
  { name: 'new haven', population: '130,000' },
  { name: 'new orleans', population: '390,000' },
  { name: 'new york', population: '8.5 million' },
  { name: 'miami', population: '450,00' },
  { name: 'philadelphia', population: '1.6 million' },
  { name: 'phoenix', population: '1.6 million' },
  { name: 'jacksonville', population: '880,000' },
];

const CustomSuggestion = (props) => (
  <div>
    <Link>{ props.suggestion.name }</Link>
    <div>population: { props.suggestion.population }</div>
  </div>
);

CustomSuggestion.propTypes = {
  suggestion: PropTypes.object,
};

const CustomAction = (props) => (
  <Link>+ add city</Link>
);

const filterByCityName = (suggestion) => suggestion.name.toLowerCase();

const stories = storiesOf('Autocomplete', module);
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
      <Autocomplete
        onSuggestionClick={ action('suggestion') }
        suggestions={ cityData.map(city => city.name) }
      />
    );
  }))
  .add('Custom suggestion field', (() => {
    return (
      <Autocomplete
        placeholder='Search cities'
        filterBy={ filterByCityName }
        onSuggestionClick={ action('suggestion') }
        suggestions={ cityData }
        SuggestionField={ CustomSuggestion }
      />
    );
  }))
  .add('Action field', (() => {
    return (
      <Autocomplete
        placeholder='Search cities'
        onActionClick={ action('action') }
        onSuggestionClick={ action('suggestion') }
        suggestions={ cityData.map(city => city.name) }
        ActionField={ CustomAction }
      />
    );
  }));
