import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import Dropdown from '../Dropdown';
import Button from '../Button';
import BlockList from '../BlockList';
import HelpPopover from '../HelpPopover';
import Input from '../Input';
import Token from '../Token';

import FilterPicker from './index.js';

/**
 * This is a clone of the contents of README.md,
 * temporarily inlined due to Storybook Issue #3458 (see below)
 *
 * TODO(https://github.com/storybooks/storybook/issues/3458) Remove and use imported README.md #3458 is released and we've updated
 * TODO(https://github.com/storybooks/storybook/issues/4499) Find a way to improve markdown formatting in the "Show Info" section
 */
/* eslint-disable max-len */
const infoAddonConfig = {
  header: false,
  text: `
# FilterList
.
### ABOUT:
FilterPicker is React _Render Component_ that uses [render props](https://reactjs.org/docs/render-props.html) to abstract
away some of the implementation complexity while allowing for maximum extensibility. This pattern was used to avoid a
"props explosion" that would come with all the variations we have of this pattern. This approach will give control to
the implementer and keep this component lean.
.
*-* **ATTN:** If a max scrollable height should be used (likely in most cases), consider using use an oui class like "max-scroll--medium" around \`BlockList.Category\`
*-* **ATTN:** If a search Input will be used with \`Blocklist\` and \`FilterList.ListItem\`, consider wrapping \`Blocklist\` inside a div with the \`oui-filter-picker-list\` class to remove the Input's bottom border (see story and story source for example)
*-* Using \`react-immutable-proptypes\`, FilterPicker can be used with Immutable or POJO datasets
*-* By default, this component filters \`selectedEntityIds\` and items that don't match the \`filterQuery\` to create and return \`availableEntities\` via the render props function
*-* If a \`customFilterFn\` is used, it will be used in place of the \`filterQuery\` filter. If \`selectedEntityIds\` should be kept in, simply do not include that list as a component prop
*-* Find out more below
.
See more how this was implemented in [\`FilterPicker.story.js\`](https://github.com/optimizely/oui/blob/devel/src/components/FilterPicker/FilterPicker.story.js).
`,
};
/* eslint-enable max-len */

storiesOf('FilterPicker', module)
  .addDecorator(withKnobs)
  .addDecorator(withInfo(infoAddonConfig))
  .addDecorator(story => (
    <div id="root-preview">
      { story() }
    </div>
  ))
  .add('Audiences', (() => {
    const AudienceConfig = {
      ANY: 'ANY',
      ALL: 'ALL',
      CUSTOM: 'CUSTOM',
    };

    const dropdownOptions = object('Dropdown Options', [
      {
        renderTitle: () => (<span>Match <strong>any</strong> audience</span>), // eslint-disable-line react/display-name
        description: 'A visitor will be in this experiment if they match one or more of the audiences specified.',
        id: AudienceConfig.ANY,
      },
      {
        renderTitle: () => (<span>Match <strong>all</strong> audiences</span>), // eslint-disable-line react/display-name
        description: 'A visitor will be in this experiment if they match all of the audiences specified.',
        id: AudienceConfig.ALL,
      },
      {
        renderTitle: () => ('Custom'),
        description: 'Visitors will be in this experiment if they match the provided audience JSON object.',
        id: AudienceConfig.CUSTOM,
      },
    ]);

    const allEntityDataValue = object('allEntities', [
      { name: 'QA Group', description: 'An audience used by QA to verify tests are working.', id: 123 },
      { name: 'Lifetime Revenue Over 5k', description: 'Authenticated users who have purchased over 5k.', id: 456 },
      { name: 'Lifetime Revenue Under 1k', description: 'Authenticated users who have purchased under 1k.', id: 789 },
      { name: 'Men over 25', description: 'Authenticated users over 25 who identify as male.', id: 135 },
      { name: 'Women over 25', description: 'Authenticated users over 25 who identify as female.', id: 246 },
    ]);

    const keysToSearchValue = object('keysToSearch', [ 'name', 'description' ]);

    const selectedEntityIdsValue = object('selectedEntityIds', [ 123, 456 ]);

    // Use recompose withState and return below to make
    // a more comprehensive and interactive story
    return (
      <FilterPicker
        allEntities={ allEntityDataValue }
        selectedEntityIds={ selectedEntityIdsValue }
        keysToSearch={ keysToSearchValue }>
        { ({ availableEntities, filterQuery, handleFilterInput, selectedEntities }) => (
          <React.Fragment>
            <h3 className="flex">
              Audiences
              <div className="push-half--left">
                <HelpPopover
                  horizontalAttachment="left"
                  popoverTitle="Audiences"
                  verticalAttachment="top">
                  <p>
                    Who do you want to see your campaign? Audiences in Optimizely X work much like they did in
                    Optimizely Classic. Use them to show your experiment to groups of visitors that you define.
                  </p>
                  <p>
                    Add conditions to define an audience, including: location, device, and more. In Optimizely X,
                    you can also target visitors based on their behavior on your site (using events and tags).
                  </p>
                  <p>
                    Audiences are optional for experiments, so skip this if you want your experiment to run for all
                    visitors.
                  </p>
                </HelpPopover>
              </div>
            </h3>
            <div>
              Choose the audience(s) you&apos;d like to show this experience to. If you choose more than one audience,
              you&apos;ll be prompted to choose a match type.
            </div>
            <div className="push--ends">
              <Dropdown
                arrowIcon="down"
                buttonContent={ dropdownOptions.find(option => option.id === 'ANY').renderTitle() }
                style="outline"
                value={ 'ANY' }>
                <BlockList>
                  { dropdownOptions.map((item) => {
                    return (
                      <BlockList.Category key={ item.id }>
                        <BlockList.Item
                          onClick={ () => { // eslint-disable-line react/jsx-no-bind
                            action('Dropdown Select')(item.id);
                          } }>
                          <div className="flex flex-align--center">
                            <div className="flex--1">
                              <div>{ dropdownOptions.find(option => option.id === item.id).renderTitle() }</div>
                              <div className="muted micro">{ item.description }</div>
                            </div>
                          </div>
                        </BlockList.Item>
                      </BlockList.Category>
                    );
                  }) }
                </BlockList>
              </Dropdown>
            </div>
            { !selectedEntities.length && (
              <div className="flex--none push-double--ends">
                <Token name="Everyone" />
              </div>
            ) }
            { !!selectedEntities.length && (
              <React.Fragment>
                <div className="muted">To be in this experiment, a visitor must match</div>
                <div className="push-half--top push-double--bottom">
                  { selectedEntities
                    .map((item, index) => {
                      const { id, name } = item;
                      return (
                        <React.Fragment key={ id }>
                          <div className="flex flex-align--center">
                            <Token name={ name } isDismissible={ true } onDismiss={ action(`Entity Remove: ${id}`) }/>
                            <div className="flex flex--1 flex-justified--end">
                              <Button
                                size="tiny"
                                style="outline"
                                width="default"
                                onClick={ action(`Selected Entity View: ${id}`) }>
                                View
                              </Button>
                            </div>
                          </div>
                          {
                            selectedEntities.length !== (index + 1) && (
                              <div className="push-half--sides push-half--ends muted">Or</div>
                            )
                          }
                        </React.Fragment>
                      );
                    }) }
                </div>
              </React.Fragment>
            ) }
            <div className="oui-filter-picker-list">
              <Input
                isFilter={ true }
                onInput={ handleFilterInput }
                placeholder="Browse for Audiences"
                type="search"
              />
              <BlockList hasBorder={ true }>
                <BlockList.Category>
                  <FilterPicker.ListItem
                    name={ 'Create New Audience' }
                    onClick={ action('Create Entity') }
                  />
                </BlockList.Category>
                <div className="max-scroll--medium">
                  <BlockList.Category header='Recently Created Audiences'>
                    { availableEntities.map((item, index) => {
                      return (
                        <FilterPicker.ListItem
                          key={ item.id }
                          id={ item.id }
                          name={ item.name }
                          description={ item.description }
                          onClick={ action(`Entity Add: ${item.id}`) }
                          buttonText={ 'View' }
                          onButtonClick={ action(`Entity Picker View: ${item.id}`) }
                        />
                      );
                    }) }
                  </BlockList.Category>
                </div>
              </BlockList>
            </div>
          </React.Fragment>
        ) }
      </FilterPicker>
    );
  }));
