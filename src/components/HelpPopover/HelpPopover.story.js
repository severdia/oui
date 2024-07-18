import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import HelpPopover from './index.js';

const stories = storiesOf('HelpPopover', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => (
    <HelpPopover popoverTitle="This is a popover title">
      This is a popover description. 🤓
    </HelpPopover>
  )))
  .add('Hover', (() => (<div>
    <div className="position--relative height--100 text--center">
      <HelpPopover
        popoverTitle="This is a popover title"
        behavior="hover"
        horizontalAttachment="left"
        verticalAttachment="middle">
       You hovered! 🤓
      </HelpPopover>
    </div>
  </div>)));
