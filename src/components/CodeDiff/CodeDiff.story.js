import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import data from './data.json';
import Table from '../Table/index.js';

import CodeDiff from './index.js';
import 'react-gh-like-diff/lib/diff2html.min.css';

const stories = storiesOf('CodeDiff', module);
stories
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div id="root-preview">
      {story()}
    </div>
  ));

const NEWTEXT = data.newFile;
const OLDTEXT = data.oldFile;

stories
  .add('Default', (() => {
    return (
      <CodeDiff
        fileName={ text('fileName', 'fileName.md') }
        updatedFileName={ text('updatedFileName', 'updatedFileName.md') }
        oldText={ text('oldText', 'Old\nText\nFile') }
        newText={ text('newText', 'New file, hello\nText and some new lines.\nIt is new and improved!') }
        hideTitle={ boolean('hideTitle', false) }
        hideInfo={ boolean('hideInfo', false) }
      />
    );
  }))
  .add('Minimal', (() => {
    return (
      <CodeDiff
        fileName={ text('fileName', 'fileName.md') }
        oldText={ 'A test with old things' }
        newText={ 'A test with new things added and changed.' }
        hideTitle={ boolean('hideTitle', false) }
        hideInfo={ boolean('hideInfo', false) }
      />
    );
  }))
  .add('Nested Inside Table', (() => {
    return (
      <Table density="loose" tableLayoutAlgorithm="fixed">
        <Table.THead>
          <Table.TR>
            <Table.TH>Before/After</Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD>
              <CodeDiff
                fileName={ text('fileName', 'fileName.md') }
                oldText={ 'A test with old things' }
                newText={ 'A test with new things added and changed.' }
                hideTitle={ boolean('hideTitle', false) }
                hideInfo={ boolean('hideInfo', false) }
              />
            </Table.TD>
          </Table.TR>
          <Table.TR noHover={ true }>
            <Table.TD>
              <Table density="loose" tableLayoutAlgorithm="fixed">
                <Table.THead>
                  <Table.TR>
                    <Table.TH> Experiment </Table.TH>
                    <Table.TH> Conversion Rate </Table.TH>
                    <Table.TH> Status </Table.TH>
                  </Table.TR>
                </Table.THead>
                <Table.TBody>
                  <Table.TR>
                    <Table.TD> Header CTA </Table.TD>
                    <Table.TD width="20%"> 12% </Table.TD>
                    <Table.TD> Paused </Table.TD>
                  </Table.TR>
                  <Table.TR>
                    <Table.TD> Shorter Contact Form </Table.TD>
                    <Table.TD> 4% </Table.TD>
                    <Table.TD> Draft </Table.TD>
                  </Table.TR>
                  <Table.TR>
                    <Table.TD> Larger search bar </Table.TD>
                    <Table.TD> 6.7% </Table.TD>
                    <Table.TD> Paused </Table.TD>
                  </Table.TR>
                  <Table.TR>
                    <Table.TD> Center aligned headline </Table.TD>
                    <Table.TD> 9.3% </Table.TD>
                    <Table.TD> Running </Table.TD>
                  </Table.TR>
                </Table.TBody>
              </Table>
            </Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>
    );
  }))
  .add('New Filename', (() => {
    return (
      <CodeDiff
        fileName={ text('fileName', 'fileName.md') }
        updatedFileName={ text('updatedFileName', 'updatedFileName.md') }
        oldText={ OLDTEXT }
        newText={ NEWTEXT }
        hideTitle={ boolean('hideTitle', false) }
        hideInfo={ boolean('hideInfo', false) }
      />
    );
  }))
  .add('Style Options', (() => {
    return (
      <div>
        <CodeDiff
          fileName='iAmLineByLine.md'
          outputStyle={ 'line-by-line' }
          oldText={ OLDTEXT }
          newText={ NEWTEXT }
          hideTitle={ boolean('hideTitle', false) }
          hideInfo={ boolean('hideInfo', false) }
        />
        <CodeDiff
          fileName='iAmSideBySide.md'
          outputStyle={ 'side-by-side' }
          oldText={ OLDTEXT }
          newText={ NEWTEXT }
          hideTitle={ boolean('hideTitle', false) }
          hideInfo={ boolean('hideInfo', false) }
        />
      </div>
    );
  }))
  .add('No Differences', (() => {
    return (
      <CodeDiff
        fileName={ text('fileName', 'fileName.md') }
        oldText={ OLDTEXT }
        newText={ OLDTEXT }
        hideTitle={ boolean('hideTitle', false) }
        hideInfo={ boolean('hideInfo', false) }
      />
    );
  }));
