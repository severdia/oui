import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import Button from '../Button/';
import Link from '../Link/';
import EmptyDashboard from './index.js';

const stories = storiesOf('Empty Dashboard', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default empty', () => {
    return (
      <EmptyDashboard
        headline={ text('headline', 'Get started with Optimizely X') }
        description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> }
        button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
        imagePath={ select('imagePath', {
          'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
          'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
          'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
          'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
          'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
          'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
          'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
          'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
        }, 'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg') }
      />
    );
  })
  .add('All images', () => {
    return (
      <div>
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> }
          button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> }
          button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> }
          button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> }
          button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath={ select('imagePath', {
            'https://app.optimizely.com/static/img/x/empty-states/campaign-list-empty-state.svg': 'Campaigns',
            'https://app.optimizely.com/static/img/x/empty-states/extensions-empty-state.svg': 'Extensions',
            'https://app.optimizely.com/static/img/x/empty-states/custom-project-experiments-empty-state.svg': 'SST',
            'https://app.optimizely.com/static/img/x/empty-states/empty-rollouts.svg': 'Rollouts',
            'https://app.optimizely.com/static/img/x/empty-states/empty-feature-flags.svg': 'Feature Flags',
            'https://app.optimizely.com/static/img/x/empty-states/audience-list-empty-state.svg': 'Audiences',
            'https://app.optimizely.com/static/img/x/empty-states/attribute-dashboard-empty-state.svg': 'Attribute',
            'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg': 'Page List',
          }, 'https://app.optimizely.com/static/img/x/empty-states/page-list-empty-state.svg') }
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath='https://app.optimizely.com/static/img/x/empty-states/change-history-empty-state.svg'
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath='https://app.optimizely.com/static/img/x/empty-states/campaign-manager-empty.svg'
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath='https://app.optimizely.com/static/img/x/empty-states/custom-snippets-empty-state.svg'
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath='https://app.optimizely.com/static/img/x/empty-states/fullstack-variables-empty-state.svg'
        />
        <EmptyDashboard
          headline={ text('headline', 'Get started with Optimizely X') }
          description={ <div>This is a test description about <Link href='http://google.com'>X Feature</Link> with a Google.</div> } button={ (<Button style="highlight">{ text('buttonText', 'Highlight') }</Button>) }
          imagePath='https://app.optimizely.com/static/img/x/empty-states/integrations-empty.svg'
        />
      </div>
    );
  });
