/* eslint-disable react/jsx-key */
import React from 'react';
import Badge from '../index';

export default [
  {
    examples: [
      <Badge color="default">Default</Badge>,
      <Badge color="draft">Draft</Badge>,
      <Badge color="live">Live</Badge>,
      <Badge color="primary">Primary</Badge>,
      <Badge color="plain">Plain</Badge>,
      <Badge color="bad-news">Bad News</Badge>,
    ],
  },
  {
    examples: [
      <div className="flex flex-align--center">
        <Badge color="draft">1</Badge> Unpublished Change
      </div>,
    ],
  },
  {
    examples: [
      <div>
        <Badge color="draft">1</Badge>
        <Badge color="live">3</Badge>
      </div>,
    ],
  },
];
