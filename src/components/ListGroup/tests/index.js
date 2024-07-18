import React from 'react';
import {
  ListGroup,
  ListGroupItem,
} from '../index';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

describe('components/ListGroup', () => {

  it('render listgroup with correct classes', () => {
    const component = shallow(
      <ListGroup
        title="Hello Title"
        subtitle="Hello Title">
        <ListGroupItem>
          Item!
        </ListGroupItem>
        <ListGroupItem>
          Item 2!
        </ListGroupItem>
      </ListGroup>
    );
    expect(component.is('div')).toBe(true);
    expect(shallowToJson(component)).toMatchSnapshot();
  });

});
