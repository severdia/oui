import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'react-oui-icons';
import Button from '../../Button';
import BlockList from '../../BlockList';

function ListItem({ buttonText, description, id, name, onButtonClick, onClick, testSection }) {
  return (
    <BlockList.Item
      onClick={ (event) => onClick(event, id, name, description) } // eslint-disable-line react/jsx-no-bind
      testSection={ testSection }>
      <div className="flex flex-align--center">
        <div className="push--right flex">
          <Icon name="add" />
        </div>
        <div
          className={ classNames('flex--1', {
            'push-half--ends': !description,
          }) }>
          <div>
            { name }
          </div>
          {
            !!description && (
              <div className="muted micro">
                { description }
              </div>
            )
          }
        </div>
        {
          !!buttonText && !!onButtonClick && (
            <Button
              size="tiny"
              style="outline"
              width="default"
              onClick={ (event) => { // eslint-disable-line react/jsx-no-bind
                // Prevent the outer Blocklist.Item's onClick from being called
                event.stopPropagation();
                onButtonClick(event, id, name, description);
              } }>
              { buttonText }
            </Button>
          )
        }
      </div>
    </BlockList.Item>
  );
}

ListItem.propTypes = {
  /* Optional Button text - must be present for optional button to show up */
  buttonText: PropTypes.string,
  /* Description of ListItem */
  description: PropTypes.string,
  /* ID used to pass into functions calls */
  id: PropTypes.number,
  /* Name of entity */
  name: PropTypes.string.isRequired,
  /**
   * Optional function, intentionally not in defaultProps
   *  - Secondary function for additional action (e.g. "View entity")
   *  - Called with the following arguments: event, id, name, description
   **/
  onButtonClick: PropTypes.func,
  /*
   * Primary function that is called with the following arguments:
   * - event, id, name, description
   **/
  onClick: PropTypes.func.isRequired,
  /* String value for the outermost container's data-test-section attribute */
  testSection: PropTypes.string,
};

ListItem.defaultProps = {
  buttonText: '',
  description: '',
  id: 0,
  testSection: '',
};

export default ListItem;
