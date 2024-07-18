import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Button from '../Button';
import Card from '../Card';

const stories = storiesOf('Card', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      { story() }
    </div>
  ));

stories
  .add('Default', (() => {
    return (
      <Card
        title={ text('title', 'Card Title') }
        shadow={ boolean('shadow', false) }
        onClose={ action('close card') }
        testSection="card">
        { text('body', 'Hello! This is a short card example.') }
      </Card>
    );
  }))
  .add('Custom Contents', (() => {
    return (
      <Card
        title={ text('title', 'Card Title') }
        shadow={ boolean('shadow', false) }
        onClose={ action('close card') }
        testSection="card">
        <div className="flex flex-align--center">
          <div className="flex--1">
            <div>Complex Contents</div>
            <div className="muted micro">This is a description.</div>
          </div>
          <Button size="small" style="outline">
            Inner Button
          </Button>
        </div>
      </Card>
    );
  }));
