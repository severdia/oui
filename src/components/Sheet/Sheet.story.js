import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import noop from 'lodash.noop';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Sheet from './index.js';
import Button from '../Button';
import Fieldset from '../Fieldset';
import Input from '../Input';

const stories = storiesOf('Sheet', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => <div id="root-preview">{story()}</div>);

stories
  .add('Default', (() => (
    <div>
      <p>This is text behind the sheet that is blocked by the overlay.</p>
      <Sheet
        title={ text('title', 'This is a Sheet') }
        subtitle={ text('subtitle', 'This is an optional subtitle string') }
        hasCloseButton={ boolean('hasCloseButton', true) }
        onClose={ action('Sheet was closed') }
        footerButtonList={ [
          <Button style="plain" key={ 0 } onClick={ noop }>
              Cancel
          </Button>,
          <Button style="highlight" key={ 1 } onClick={ noop }>
              Confirm
          </Button>,
        ] }>
        <Fieldset
          title="Project Name"
          description="Give your project a name"
          isOptional={ false }
          helpIcon={ true }
          popoverTitle="Popover title"
          popoverText="This should help you figure out what to do">
          <Input id="input-01" label="Some data" type="text"/>
          <Input id="input-02" label="Some more data" type="text"/>
        </Fieldset>
        <Fieldset
          title="Project Description"
          description="Give your project a description"
          isOptional={ true }
          helpIcon={ true }
          popoverTitle="Popover title"
          popoverText="This should help you figure out what to do">
          <Input id="input-03" label="Some data" type="text"/>
        </Fieldset>
        <Fieldset
          title="Project Details">
          <Input id="input-04" label="Target URL" type="text" isRequired={ true }/>
        </Fieldset>
      </Sheet>
    </div>
  ))
  )
  .add('With a link in subtitle',
    withInfo()(() => (
      <div>
        <p>This is text behind the sheet that is blocked by the overlay.</p>
        <Sheet
          title={ text('title', 'This is a Sheet') }
          subtitle={ <p>Subtitles can take also take nodes, <a href="https://www.optimizely.com/">like a link</a></p> }
          hasCloseButton={ boolean('hasCloseButton', true) }
          onClose={ action('Sheet was closed') }
          footerButtonList={ [
            <Button style="plain" key={ 0 } onClick={ noop }>
              Cancel
            </Button>,
            <Button style="highlight" key={ 1 } onClick={ noop }>
              Confirm
            </Button>,
          ] }>
          <Fieldset
            title="Project Name"
            description="Give your project a name"
            isOptional={ false }
            helpIcon={ true }
            popoverTitle="Popover title"
            popoverText="This should help you figure out what to do">
            <Input id="input-01" label="Some data" type="text"/>
            <Input id="input-02" label="Some more data" type="text"/>
          </Fieldset>
          <Fieldset
            title="Project Description"
            description="Give your project a description"
            isOptional={ true }
            helpIcon={ true }
            popoverTitle="Popover title"
            popoverText="This should help you figure out what to do">
            <Input id="input-03" label="Some data" type="text"/>
          </Fieldset>
          <Fieldset
            title="Project Details">
            <Input id="input-04" label="Target URL" type="text" isRequired={ true }/>
          </Fieldset>
        </Sheet>
      </div>
    ))
  );
