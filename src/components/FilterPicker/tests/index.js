import React from 'react';
import FilterPicker from '../index';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import BlockList from '../../BlockList';
import Input from '../../Input';

const ALL_ENTITIES_POJO_ARRAY = [
  {
    name: 'QA Group',
    description: 'An audience used by QA to verify tests are working.',
    id: 123,
    status: 'inactive',
  },
  {
    name: 'Lifetime Revenue Over 5k',
    description: 'Authenticated users who have purchased over 5k.',
    id: 456,
    status: 'active',
  },
  { name: 'Lifetime Revenue Under 1k',
    description: 'Authenticated users who have purchased under 1k.',
    id: 789,
    status: 'active',
  },
  { name: 'Men over 25',
    description: 'Authenticated users over 25 who identify as male.',
    id: 135,
    status: 'active',
  },
  { name: 'Women over 25',
    description: 'Authenticated users over 25 who identify as female.',
    id: 246,
    status: 'active',
  },
];

// Immutable Mocks
const ALL_ENTITIES_IMMUTABLE_LIST_MOCK = {
  value: ALL_ENTITIES_POJO_ARRAY.map(value => ({
    value,
    get: function(keyValue, defaultValue = undefined) {
      return this.value[keyValue] || defaultValue;
    },
    size: Object.keys(value).length,
  })),
  filter: function(...args) {
    return this.value.filter(...args);
  },
  map: function(...args) {
    return this.value.map(...args);
  },
};

const SELECTED_ENTITY_IDS = [ 123, 456 ];

describe('components/FilterPicker', () => {
  let component;
  let mockFn = jest.fn(info => info);
  const actionSpy = info => () => mockFn(info);

  const renderPojoChildren = ({ availableEntities, filterQuery, handleFilterInput, selectedEntities }) => ( // eslint-disable-line react/prop-types
    <React.Fragment>
      <div>Selected</div>
      <ul data-test-section="selected-entities">
        { selectedEntities.map(({ description, id, name }) => (
          <ul
            data-test-section={ `selected-entity-${String(id)}` }
            key={ id }>
            <li>Name: { name }</li>
            <li>Description: { description }</li>
            <li>ID: { id }</li>
          </ul>
        )) }
      </ul>
      <Input
        isFilter={ true }
        onInput={ handleFilterInput }
        placeholder="Browse for Audiences"
        testSection="filter-query-input"
        type="search"
      />
      <div>Available</div>
      <BlockList hasBorder={ true }>
        <BlockList.Category>
          <FilterPicker.ListItem
            name={ !!filterQuery ? `Create New Audience named ${filterQuery}` : 'Create New Audience' }
            onClick={ actionSpy('Create Entity') }
          />
        </BlockList.Category>
        <BlockList.Category header='Recently Created Audiences'>
          { availableEntities.map(({ id, name, description }, index) => (
            <FilterPicker.ListItem
              key={ id }
              id={ id }
              name={ name }
              description={ description }
              onClick={ actionSpy(`Entity Add: ${id}`) }
              buttonText={ 'View' }
              onButtonClick={ actionSpy(`Entity Picker View: ${id}`) }
              testSection={ `filter-picker-list-item-${String(id)}` }
            />
          )) }
        </BlockList.Category>
      </BlockList>
    </React.Fragment>
  );

  const renderImmutableChildren = ({ availableEntities, filterQuery, handleFilterInput, selectedEntities }) => ( // eslint-disable-line react/prop-types
    <React.Fragment>
      <div>Selected</div>
      <ul data-test-section="selected-entities">
        { selectedEntities.map((item) => (
          <ul
            key={ item.get('id') }
            data-test-section={ `selected-entity-${String(item.get('id'))}` }>
            <li>Name: { item.get('name') }</li>
            <li>Description: { item.get('description') }</li>
            <li>ID: { item.get('id') }</li>
          </ul>
        )) }
      </ul>
      <Input
        isFilter={ true }
        onInput={ handleFilterInput }
        placeholder="Browse for Audiences"
        testSection="filter-query-input"
        type="search"
      />
      <div>Available</div>
      <BlockList hasBorder={ true }>
        <BlockList.Category>
          <FilterPicker.ListItem
            name={ !!filterQuery ? `Create New Audience named ${filterQuery}` : 'Create New Audience' }
            onClick={ actionSpy('Create Entity') }
            testSection="filter-picker-create-item"
          />
        </BlockList.Category>
        <BlockList.Category header='Recently Created Audiences'>
          { availableEntities.map((item) => (
            <FilterPicker.ListItem
              key={ item.get('id') }
              id={ item.get('id') }
              name={ item.get('name') }
              description={ item.get('description') }
              onClick={ actionSpy(`Entity Add: ${item.get('id')}`) }
              buttonText={ 'View' }
              onButtonClick={ actionSpy(`Entity Picker View: ${item.get('id')}`) }
              testSection={ `filter-picker-list-item-${String(item.get('id'))}` }
            />
          )) }
        </BlockList.Category>
      </BlockList>
    </React.Fragment>
  );

  const standardFilterPickerAssertions = ({ withCustomFilterAndKeys } = {}) => {
    it('properly computes selectedEntities and availableEntities from allEntities', function() {
      const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
      const filterPickerListItems = component.find(BlockList.Item);
      expect(selectedEntities).toHaveLength(2);
      // There should be one BlockList.Item "Create New Audience" ListItem,
      // plus the available entity/entities
      expect(filterPickerListItems).toHaveLength(4);
    });
    it('renders correct availableEntities when one word, matching filterQuery is present', function() {
      if (withCustomFilterAndKeys) {
        component.find('[data-test-section="filter-query-input"]').simulate('input', { target: { value: 'Women' } });
        const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
        const filterPickerListItems = component.find(BlockList.Item);
        expect(selectedEntities).toHaveLength(2);
        // There should be one BlockList.Item "Create New Audience" ListItem,
        // plus the available entity/entities
        expect(filterPickerListItems).toHaveLength(2);
        return;
      }
      component.find('[data-test-section="filter-query-input"]').simulate('input', { target: { value: 'identify' } });
      const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
      const filterPickerListItems = component.find(BlockList.Item);
      expect(selectedEntities).toHaveLength(2);
      // There should be one BlockList.Item "Create New Audience" ListItem,
      // plus the available entity/entities
      expect(filterPickerListItems).toHaveLength(3);
    });
    it('renders correct availableEntities when a two word, matching filterQuery is present', function() {
      if (withCustomFilterAndKeys) {
        component.find('[data-test-section="filter-query-input"]').simulate('input', { target: { value: 'Women over' } });
        const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
        const filterPickerListItems = component.find(BlockList.Item);
        expect(selectedEntities).toHaveLength(2);
        // There should be one BlockList.Item "Create New Audience" ListItem,
        // plus the available entity/entities
        expect(filterPickerListItems).toHaveLength(2);
        return;
      }
      component.find('[data-test-section="filter-query-input"]').simulate('input', { target: { value: 'identify male' } });
      const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
      const filterPickerListItems = component.find(BlockList.Item);
      expect(selectedEntities).toHaveLength(2);
      // There should be one BlockList.Item "Create New Audience" ListItem,
      // plus the available entity/entities
      expect(filterPickerListItems).toHaveLength(3);
    });
    it('renders correct availableEntities when one matching word & one non-matching word filterQuery is present', function() {
      if (withCustomFilterAndKeys) {
        component.find('[data-test-section="filter-query-input"]').simulate('input', { target: { value: 'Women identify' } });
        const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
        const filterPickerListItems = component.find(BlockList.Item);
        expect(selectedEntities).toHaveLength(2);
        // There should be one BlockList.Item "Create New Audience" ListItem,
        // plus the available entity/entities
        expect(filterPickerListItems).toHaveLength(1);
        return;
      }
      component.find('[data-test-section="filter-query-input"]').simulate('input', { target: { value: 'identify female' } });
      const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
      const filterPickerListItems = component.find(BlockList.Item);
      expect(selectedEntities).toHaveLength(2);
      // There should be one BlockList.Item "Create New Audience" ListItem,
      // plus the available entity/entities
      expect(filterPickerListItems).toHaveLength(2);
    });
    it('renders correct selectedEntities when selectedEntityIds prop is updated', function() {
      component.setProps({ selectedEntityIds: SELECTED_ENTITY_IDS.concat(789) });
      const selectedEntities = component.find('[data-test-section="selected-entities"] > ul');
      const filterPickerListItems = component.find(BlockList.Item);
      expect(selectedEntities).toHaveLength(3);
      // There should be one BlockList.Item "Create New Audience" ListItem,
      // plus the available entity/entities
      expect(filterPickerListItems).toHaveLength(3);
    });
    it('FilterPicker.ListItem onClick works correctly', function() {
      component.find('[data-test-section="filter-picker-list-item-246"] .oui-block-list__item').simulate('click');
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toBeCalledWith('Entity Add: 246');
      expect(mockFn).not.toBeCalledWith('Entity Picker View: 246');
    });
    it('FilterPicker.ListItem onButtonClick works correctly when provided and onClick is not called', function() {
      component.find('[data-test-section="filter-picker-list-item-246"] .oui-button').simulate('click');
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toBeCalledWith('Entity Picker View: 246');
      expect(mockFn).not.toBeCalledWith('Entity Add: 246');
    });
    it('should match the Jest Snapshot', function() {
      expect(mountToJson(component)).toMatchSnapshot();
    });
  };

  afterEach(function() {
    mockFn.mockClear();
  });

  describe('with POJO data', function() {
    describe('with DEFAULT keysToSearch and customFilterFn', function() {
      beforeEach(function() {
        component = mount(
          <FilterPicker
            allEntities={ ALL_ENTITIES_POJO_ARRAY }
            selectedEntityIds={ SELECTED_ENTITY_IDS }
            testSection="audiences-filter-picker">
            { ({ availableEntities, filterQuery, handleFilterInput, selectedEntities }) => renderPojoChildren({
              availableEntities,
              filterQuery,
              handleFilterInput,
              selectedEntities,
            }) }
          </FilterPicker>
        );
      });
      standardFilterPickerAssertions();
    });
    describe('with CUSTOM keysToSearch and customFilterFn', function() {
      beforeEach(function() {
        component = mount(
          <FilterPicker
            allEntities={ ALL_ENTITIES_POJO_ARRAY }
            customFilterFn={ (item, filterQuery = '', contentToSearch = '') => contentToSearch.includes(filterQuery) } // eslint-disable-line react/jsx-no-bind
            keysToSearch={ [ 'name' ] }
            selectedEntityIds={ SELECTED_ENTITY_IDS }
            testSection="audiences-filter-picker">
            { ({ availableEntities, filterQuery, handleFilterInput, selectedEntities }) => renderPojoChildren({
              availableEntities,
              filterQuery,
              handleFilterInput,
              selectedEntities,
            }) }
          </FilterPicker>
        );
      });
      standardFilterPickerAssertions({ withCustomFilterAndKeys: true });
    });
  });

  describe('with Immutable data (mocked)', function() {
    describe('with DEFAULT keysToSearch and customFilterFn', function() {
      beforeEach(function() {
        component = mount(
          <FilterPicker
            allEntities={ ALL_ENTITIES_IMMUTABLE_LIST_MOCK }
            selectedEntityIds={ SELECTED_ENTITY_IDS }
            testSection="audiences-filter-picker">
            { ({ availableEntities, filterQuery, handleFilterInput, selectedEntities }) => renderImmutableChildren({
              availableEntities,
              filterQuery,
              handleFilterInput,
              selectedEntities,
            }) }
          </FilterPicker>
        );
      });
      standardFilterPickerAssertions();
    });
    describe('with CUSTOM keysToSearch and customFilterFn', function() {
      beforeEach(function() {
        component = mount(
          <FilterPicker
            allEntities={ ALL_ENTITIES_IMMUTABLE_LIST_MOCK }
            customFilterFn={ (item, filterQuery = '', contentToSearch = '') => contentToSearch.includes(filterQuery) } // eslint-disable-line react/jsx-no-bind
            keysToSearch={ [ 'name' ] }
            selectedEntityIds={ SELECTED_ENTITY_IDS }
            testSection="audiences-filter-picker">
            { ({ availableEntities, filterQuery, handleFilterInput, selectedEntities }) => renderImmutableChildren({
              availableEntities,
              filterQuery,
              handleFilterInput,
              selectedEntities,
            }) }
          </FilterPicker>
        );
      });
      standardFilterPickerAssertions({ withCustomFilterAndKeys: true });
    });
  });

  describe('FilterPicker.ListItem', function() {
    it('FilterPicker.ListItem button is not present when onButtonClick is not provided but buttonText is', function() {
      component = mount(
        <FilterPicker
          allEntities={ ALL_ENTITIES_POJO_ARRAY }
          selectedEntityIds={ SELECTED_ENTITY_IDS }
          testSection="audiences-filter-picker">
          { ({ availableEntities }) => (
            <BlockList hasBorder={ true }>
              <BlockList.Category header='Recently Created Audiences'>
                { availableEntities.map(({ id, name, description }, index) => (
                  <FilterPicker.ListItem
                    key={ id }
                    id={ id }
                    name={ name }
                    description={ description }
                    onClick={ actionSpy(`Entity Add: ${id}`) }
                    buttonText={ 'View' }
                    testSection={ `filter-picker-list-item-${String(id)}` }
                  />
                )) }
              </BlockList.Category>
            </BlockList>
          ) }
        </FilterPicker>
      );
      expect(component.find('[data-test-section="filter-picker-list-item-246"] .oui-button')).toHaveLength(0);
    });
    it('FilterPicker.ListItem button is not present when onButtonClick is provided but buttonText is not', function() {
      component = mount(
        <FilterPicker
          allEntities={ ALL_ENTITIES_POJO_ARRAY }
          selectedEntityIds={ SELECTED_ENTITY_IDS }
          testSection="audiences-filter-picker">
          { ({ availableEntities }) => (
            <BlockList hasBorder={ true }>
              <BlockList.Category header='Recently Created Audiences'>
                { availableEntities.map(({ id, name, description }, index) => (
                  <FilterPicker.ListItem
                    key={ id }
                    id={ id }
                    name={ name }
                    description={ description }
                    onClick={ actionSpy(`Entity Add: ${id}`) }
                    onButtonClick={ actionSpy(`Entity Picker View: ${id}`) }
                    testSection={ `filter-picker-list-item-${String(id)}` }
                  />
                )) }
              </BlockList.Category>
            </BlockList>
          ) }
        </FilterPicker>
      );
      expect(component.find('[data-test-section="filter-picker-list-item-246"] .oui-button')).toHaveLength(0);
    });
  });
});
