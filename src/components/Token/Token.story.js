import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Token from './index.js';
import { action } from '@storybook/addon-actions/dist/preview';

const stories = storiesOf('Token', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('default', (() => (<div>
    <Token
      isDismissible={ true }
      name="Hello"
      style="primary"
      hasSnugWrap={ boolean('hasSnugWrap', false) }
    />
    <Token
      name="World"
      style="secondary"
      hasSnugWrap={ boolean('hasSnugWrap', false) }
    />
  </div>)))
  .add('no well', (() => (<div>
    <Token
      name="Hello"
      style="primary"
      showWell={ false }
      hasSnugWrap={ boolean('hasSnugWrap', false) }
    />
    <Token
      name="World"
      style="secondary"
      showWell={ false }
      hasSnugWrap={ boolean('hasSnugWrap', false) }
    />
  </div>)))
  .add('draggable', () => {
    return (
      <React.Fragment>
        <div className="push--bottom">
          <Token
            description="The big kids."
            isDismissible={ true }
            isDraggable={ true }
            name="Students: Grades 6-12"
            order={ 1 }
            style="primary"
          />
        </div>
        <div className="push--bottom">
          <Token
            description="The little kids."
            isDismissible={ true }
            isDraggable={ true }
            name="Students: Grades K-5"
            order={ 1 }
            style="secondary"
          />
        </div>
        <div className="push--bottom">
          <Token
            description="The little little kids."
            isDismissible={ true }
            isDraggable={ true }
            name="Students: TK"
            order={ 1 }
            style="secondary"
          />
        </div>
      </React.Fragment>
    );
  })
  .add('dismissible', () => {
    return (
      <Token
        isDismissible={ true }
        name="Delete me!"
        style="primary"
        onDismiss={ action('token dismissed') }
        hasSnugWrap={ boolean('hasSnugWrap', false) }
      />);
  });
