/* eslint-disable react/jsx-key */
import React from 'react';
import Button from '../../Button/';
import EmptyDashboard from '../index';

export default [
  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg'
      />,
    ],
  },

  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X Extensions'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg'
      />,
    ],
  },

  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg'
      />,
    ],
  },

  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg'
      />,
    ],
  },

  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg'
      />,
    ],
  },

  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg'
      />,
    ],
  },

  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg'
      />,
    ],
  },

  {
    isPadded: true,
    examples: [
      <EmptyDashboard
        headline='Get started with Optimizely X'
        description={ <div>This is a test description about with a Google.</div> }
        button={ (<Button style="highlight">Highlight</Button>) }
        imagePath='https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg'
      />,
    ],
  },

];
