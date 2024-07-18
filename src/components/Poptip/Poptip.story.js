import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import Poptip from './index.js';
import Button from '../Button';
import Icon from 'react-oui-icons';

const stories = storiesOf('Poptip', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      <div className="flexboxCenter">
        {story()}
      </div>
    </div>
  ));

stories
  .add('Basic poptip', (() => (
    <Poptip
      trigger='click'
      content="This is a sample poptip."
      position="right">
      <Button width="default">
        Default Poptip
      </Button>
    </Poptip>
  )))
  .add('Poptip with children inline', (() => (
    <div
      className="flex flex-align--center line--1">
      <input
        className="text-input width--300 push-half--right"
        type="text"
      />
      <Poptip
        content="Block Origin"
        position="right"
        isInline={ true }>
        <Icon name='ban'/>
      </Poptip>
    </div>
  )))
  .add('Poptip to the right', (() => (
    <Poptip
      trigger='mouseenter'
      content="This is a sample poptip."
      position='right'>
      <Button style="unstyled" width="default">
        <a>Poptip on the right</a>
      </Button>
    </Poptip>
  )))
  .add('Poptip light theme', (() => (
    <Poptip
      trigger='click'
      content="This is a sample poptip."
      theme='light'>
      <Button style="unstyled" width="default">
        <a>Click Poptip, light theme</a>
      </Button>
    </Poptip>
  )))
  .add('Poptip light theme on the right', (() => (
    <Poptip
      trigger='click'
      content="This is a sample poptip."
      theme='light'
      position='right'>
      <Button style="unstyled" width="default">
        <a>Click Poptip, light theme, on the right</a>
      </Button>
    </Poptip>
  )))
  .add('Customizable with knobs', (() => (
    <Poptip
      content={ 'This is a sample poptip.' }
      disable={ boolean('disable', false) }
      isAnimated={ boolean('isAnimated', true) }
      position={ select('position', ['top', 'right', 'bottom', 'left'], 'top') }
      theme={ select('theme', ['dark', 'light', 'transparent'], 'dark') }
      trigger={ select('trigger', ['mouseenter', 'focus', 'click', 'manual'], 'mouseenter') }>
      <Button width="default">
        Customizable Poptip
      </Button>
    </Poptip>
  )))
  .add('Basic poptip with delay', (() => (
    <Poptip
      trigger='mouseenter'
      delay={ 1000 }
      hideDelay={ 5000 }
      content="Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae nihil libero et, hic!">
      <Button width="default">
        Default Poptip
      </Button>
    </Poptip>
  )));
