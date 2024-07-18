import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Popover from './index.js';
import OverlayWrapper from '../OverlayWrapper';
import Button from '../Button';

const stories = storiesOf('Popover', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => (
    <div>
      <div className="position--relative height--100 text--center">
        <Popover title="Lorem ipsum dolor sit amet">
          <p>
            Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae nihil libero et, hic!
          </p>
        </Popover>
      </div>
    </div>
  )))
  .add('Popover in action', (() => (
    <div className="position--relative height--100 text--center">
      <OverlayWrapper
        behavior="click"
        horizontalAttachment="center"
        overlay={ <Popover title="This is a working Popover!"><p>See `OverlayWrapper` for more examples.</p></Popover> }
        shouldHideOnClick={ true }
        verticalAttachment="top">
        <Button width="default"> Open Popover </Button>
      </OverlayWrapper>
    </div>
  )));

