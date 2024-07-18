/* eslint-disable react/jsx-key */
import React from 'react';
import OverlayWrapper from '../index';

import Button from '../../Button/';
import Popover from '../../Popover/';

export default [
  {
    examples: [
      <div className="position--relative height--100">
        <OverlayWrapper
          overlay={ <Popover title="Lorem ipsum dolor sit amet">
            <p>
                Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae
                nihil libero et, hic!
            </p>
          </Popover> }>
          <Button>Open Popover</Button>
        </OverlayWrapper>
      </div>,
    ],
  },
  {
    examples: [
      <div className="position--relative height--100">
        <OverlayWrapper
          overlay={ <Popover title="Lorem ipsum dolor sit amet">
            <p>
                Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae
                nihil libero et, hic!
            </p>
          </Popover> }
          horizontalAttachment="left"
          horizontalTargetAttachment="right"
          verticalAttachment="middle"
          verticalTargetAttachment="middle"
          isConstrainedToScreen={ true }>
          <Button>Open Pinned Popover</Button>
        </OverlayWrapper>
      </div>,
    ],
  },
  {
    examples: [
      <div className="position--relative height--100">
        <OverlayWrapper
          overlay={ <Popover>
            <p>
                The close button works because `OverlayWrapper` exposes a
                `hideOverlay` method using `context` in React.
            </p>
            <p>See the source for `OverlayWrapper` to learn more.</p>
          </Popover> }>
          <Button>Popover With A Close Button</Button>
        </OverlayWrapper>
      </div>,
    ],
  },
  {
    examples: [
      <div className="position--relative height--100">
        <OverlayWrapper
          overlay={ <Popover title="Lorem ipsum dolor sit amet">
            <p>
                Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae
                nihil libero et, hic!
            </p>
          </Popover> }
          horizontalAttachment="left"
          horizontalTargetAttachment="left"
          verticalAttachment="top"
          verticalTargetAttachment="bottom">
          <Button>Open Popover</Button>
        </OverlayWrapper>
      </div>,
    ],
  },
  {
    examples: [
      <div className="position--relative height--100">
        <OverlayWrapper
          overlay={ <Popover title="Lorem ipsum dolor sit amet">
            <p>
                Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae
                nihil libero et, hic!
            </p>
          </Popover> }
          shouldHideOnClick={ false }>
          <Button>Don't Close On Click Outside Popover</Button>
        </OverlayWrapper>
      </div>,
    ],
  },
];
