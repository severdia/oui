/* eslint-disable react/jsx-key */
import React from 'react';
import Poptip from '../index';
import Button from '../../Button';
import Icon from 'react-oui-icons';

export default [
  {
    examples: [
      <div className="position--relative height--100">
        <Poptip
          content="Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae nihil libero et, hic!">
          <Button>Basic Poptip</Button>
        </Poptip>
      </div>,
    ],
  },
  {
    examples: [
      <div className="position--relative height--100">
        Learn More&hellip;&nbsp;
        <Poptip
          content="Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae nihil libero et, hic!"
          horizontalAttachment="left"
          horizontalTargetAttachment="right"
          verticalAttachment="middle"
          verticalTargetAttachment="middle">
          <Button style="unstyled">
            <Icon name='help' />
          </Button>
        </Poptip>
      </div>,
    ],
  },
  {
    examples: [
      <div className="position--relative height--100">
        <Poptip
          content="Ipsa officiis bad-news minus earum a aperiam! Aperiam reiciendis vitae nihil libero et, hic!"
          horizontalAttachment="left"
          horizontalTargetAttachment="left"
          verticalAttachment="top"
          verticalTargetAttachment="bottom">
          <Button>Poptip With Advanced Positioning</Button>
        </Poptip>
      </div>,
    ],
  },
];
