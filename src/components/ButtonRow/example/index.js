/* eslint-disable react/jsx-key */
import React from 'react';
import Button from '../../Button';
import ButtonRow from '../../ButtonRow';

export default [
  {
    examples: [
      <ButtonRow
        leftGroup={ [
          <Button key="1" style="plain">Skip this step</Button>,
        ] }
        rightGroup={ [
          <Button key="1" style="plain">Plain Button</Button>,
          <Button key="2" style="highlight">Highlight Button</Button>,
        ] }
      />,
    ],
  },
  {
    examples: [
      <ButtonRow
        centerGroup={ [
          <Button key="1" style="outline">Center Button</Button>,
          <Button key="2" style="highlight">Center Button</Button>,
        ] }
      />,
    ],
  },
  {
    examples: [
      <ButtonRow
        centerGroup={ [
          <Button key="1" style="outline" width="full">Full Width</Button>,
          <Button key="2" style="outline" width="full">Full Width</Button>,
          <Button key="3" style="highlight" width="full">Full Width</Button>,
        ] }
      />,
    ],
  },
];
