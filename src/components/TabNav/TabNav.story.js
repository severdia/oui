import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import TabNav from './index.js';

const stories = storiesOf('TabNav', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Dashboard tabs', (() => (
    <TabNav activeTab="second" style={ ['dashboard'] }>
      <TabNav.Tab onClick={ action('first tab clicked') } tabId="first">
        Tab #1
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('second tab clicked') } tabId="second">
        Tab #2
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('third tab clicked') } tabId="third">
        Tab #3
      </TabNav.Tab>
    </TabNav>
  )))
  .add('Basic tabs', (() => (
    <TabNav activeTab="first">
      <TabNav.Tab onClick={ action('first tab clicked') } tabId="first">
        Tab #1
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('second tab clicked') } tabId="second">
        Tab #2
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('third tab clicked') } tabId="third">
        Tab #3
      </TabNav.Tab>
    </TabNav>
  )))
  .add('Closed tabs', (() => (
    <TabNav activeTab="second" style={ ['small'] }>
      <TabNav.Tab onClick={ action('first tab clicked') } tabId="first">
        Tab #1
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('second tab clicked') } tabId="second">
        Tab #2
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('third tab clicked') } tabId="third">
        Tab #3
      </TabNav.Tab>
    </TabNav>
  )))
  .add('Centered tabs', (() => (
    <TabNav activeTab="first" style={ ['small', 'center'] }>
      <TabNav.Tab onClick={ action('first tab clicked') } tabId="first">
        Tab #1
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('second tab clicked') } tabId="second">
        Tab #2
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('third tab clicked') } tabId="third">
        Tab #3
      </TabNav.Tab>
    </TabNav>
  )))
  .add('Plain tabs', (() => (
    <TabNav activeTab="first" style={ ['small', 'sub'] }>
      <TabNav.Tab onClick={ action('first tab clicked') } tabId="first">
        Tab #1
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('second tab clicked') } tabId="second">
        Tab #2
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('third tab clicked') } tabId="third">
        Tab #3
      </TabNav.Tab>
    </TabNav>
  )))
  .add('Sub tabs', (() => (
    <TabNav activeTab="first" style={ ['sub'] }>
      <TabNav.Tab onClick={ action('first tab clicked') } tabId="first">
        Tab #1
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('second tab clicked') } tabId="second">
        Tab #2
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('third tab clicked') } tabId="third">
        Tab #3
      </TabNav.Tab>
    </TabNav>
  )))
  .add('Header tabs', (() => (
    <TabNav activeTab="first" style={ ['header'] }>
      <TabNav.Tab onClick={ action('first tab clicked') } tabId="first">
        Tab #1
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('second tab clicked') } tabId="second">
        Tab #2
      </TabNav.Tab>
      <TabNav.Tab onClick={ action('third tab clicked') } tabId="third">
        Tab #3
      </TabNav.Tab>
    </TabNav>
  )));
