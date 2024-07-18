import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select, object, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import ListGroup from '../ListGroup';
import Input from '../Input';

/**
 * This is a clone of the contents of README.md,
 * temporarily inlined due to Storybook Issue #3458 (see below)
 *
 * TODO(https://github.com/storybooks/storybook/issues/3458) Remove and use imported README.md #3458 is released and we've updated
 * TODO(https://github.com/storybooks/storybook/issues/4499) Find a way to improve markdown formatting in the "Show Info" section
 */
/* eslint-disable max-len */
const infoAddonConfig = {
  header: false,
  text: `
# ListGroup Component
.
## ABOUT:
This simple layout component is used on various settings pages throughout the app to display a media-block style two column layout. The title and optional subtitle are the first column, the second column made up of a series of vertically stacked <ListGroup.Item>s which get a border between each item.
.
Use one <ListGroup.Item> per single setting or a logical grouping of a few related settings.
`,
};
/* eslint-enable max-len */

const stories = storiesOf('ListGroup', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(withInfo(infoAddonConfig))
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => {

    const theTitle = text('The Main Title', 'Hello World!');
    const itemDensity = select('item.density', { 'loose': 'loose', 'tight': 'tight' }, 'loose');
    const theSubtitle = text('The Subtitle', 'What if it runs really long and could break into several lines...');
    const demoArray = object('demoArray (example knob, not a prop)', [
      { name: 'ListGroup.Item Text 1', value: 'Value 1' },
      { name: 'ListGroup.Item Text 2', value: 'Value 2' },
      { name: 'ListGroup.Item Text 3 (density=tight)', value: 'Value 3', density: 'tight' },
      { name: 'ListGroup.Item Text 4', value: 'Value 4' },
      { name: 'ListGroup.Item Text 5', value: 'Value 5' },
      { name: 'ListGroup.Item Text 6', value: 'Value 6' },
    ]);

    return (
      <ListGroup
        title={ theTitle }
        subtitle={ theSubtitle }>
        { demoArray.map(item => (
          <ListGroup.Item key={ item.value } density={ item.density || itemDensity }>
            { item.name }<br/>
            <span className="muted">{ item.value }</span>
          </ListGroup.Item>
        )) }
      </ListGroup>
    );
  }))
  .add('ListGroup density tight', (() => {
    return (
      <ListGroup
        title='ListGroup Title'
        subtitle='ListGroup Subtitle'>
        <ListGroup.Item>
          <Input placeholder="Plain Input inside <ListGroup>" type="text" />
        </ListGroup.Item>
        <ListGroup.Item>
          <Input placeholder="Plain Input inside <ListGroup>" type="text" />
        </ListGroup.Item>
        <ListGroup.Item>
          <Input placeholder="Plain Input inside <ListGroup>" type="text" />
        </ListGroup.Item>
        <ListGroup.Item
          density={ select('Density (4th item)', {
            'loose': 'loose',
            'tight': 'tight'}, 'tight') }>
          <Input placeholder="Plain Input inside <ListGroup density=tight> (try the density knob!)" type="text" />
        </ListGroup.Item>
        <ListGroup.Item>
          <Input placeholder="Plain Input inside <ListGroup>" type="text" />
        </ListGroup.Item>
        <ListGroup.Item>
          <Input placeholder="Plain Input inside <ListGroup>" type="text" />
        </ListGroup.Item>
      </ListGroup>
    );
  }));
