/* eslint-disable react/jsx-key */
import React from 'react';
import Popover from '../index';

import Button from '../../Button/';
import OverlayWrapper from '../../OverlayWrapper/';

export default [
  {
    examples: [
      <div className="position--relative height--100">
        <Popover title="Lorem ipsum dolor sit amet">
          <p>
            Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae
            nihil libero et, hic!
          </p>
        </Popover>
      </div>,
    ],
  },
  {
    examples: [
      <div className="position--relative height--100">
        <OverlayWrapper
          overlay={ <Popover title="This is a working Popover!">
            <p>See `OverlayWrapper` for more examples.</p>
          </Popover> }>
          <Button>Open Popover</Button>
        </OverlayWrapper>
      </div>,
    ],
  },
];
