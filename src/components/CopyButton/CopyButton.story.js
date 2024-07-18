import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import CopyButton from '../CopyButton';

const code = `const CopyButton = ({ testSection, onClick, text }) => {
  return (
    <CopyToClipboard
      text={ textToCopy }
      onCopy={ onClick }>
      <Button
        style="plain"
        ariaLabel="Copy code snippet"
        testSection={ testSection }>
        <Icon name='clipboard' />
      </Button>
    </CopyToClipboard>
  );
}`;

const stories = storiesOf('CopyButton', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

stories
  .add('Default', (() => {
    return (
      <CopyButton textToCopy={ code } />
    );
  }))
  .add('With style specified', (() => {
    return (
      <CopyButton
        textToCopy={ code }
        style={ select('style', {
          'none': 'none (use default button style)',
          'highlight': 'highlight',
          'danger': 'danger',
          'danger-outline': 'danger-outline',
          'outline': 'outline',
          'outline-reverse': 'outline-reverse',
          'plain': 'plain',
          'toggle': 'toggle',
          'underline': 'underline',
          'unstyled': 'unstyled',
        }, 'none') }
      />
    );
  }));
