import PropTypes from 'prop-types';
import React from 'react';

import classnames from 'classnames';


class Steps extends React.Component {
  static propTypes = {
    /**
     * The currently selected step, maps to a value in items.
     */
    currentStep: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    /**
     * Dropdown items that can be selected from the select dropdown.
     */
    items: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      label: PropTypes.node.isRequired,
    })).isRequired,
    /**
     * Function that is called when user clicks on a step.
     */
    onClick: PropTypes.func.isRequired,
    /**
     * Identifier used to create data-test-section attributes for testing.
     */
    testSection: PropTypes.string,
    /**
     * Determines whether to show editable styling,
     * and whether to call passed click handler.
     */
    userCanEdit: PropTypes.bool,
  };

  static defaultProps = {
    userCanEdit: true,
  }

  render() {
    const {
      items,
      onClick,
      testSection,
      currentStep,
      userCanEdit,
    } = this.props;

    return (
      <ul
        className="oui-steps"
        data-oui-component={ true }
        { ...(testSection ? { 'data-test-section': testSection } : {}) }>
        {
          items.map((item, index) => {
            const stepIsActive = item.value === currentStep;
            let indexOfCurrentStep = 0;
            items.forEach(function(innerItem, innerIndex) {
              if (innerItem.value === currentStep) {
                indexOfCurrentStep = innerIndex;
              }
            });
            const stepIsComplete = index < indexOfCurrentStep;

            function onClickStep() {
              if (!userCanEdit) {
                return;
              }

              onClick(item.value);
            }

            return (
              <li
                key={ item.value }
                className={
                  classnames(
                    'oui-steps__item',
                    {
                      'oui-steps__item--active': stepIsActive,
                      'oui-steps__item--complete': stepIsComplete,
                      'oui-steps__item--editable': userCanEdit,
                    }
                  )
                }
                onClick={ onClickStep }
                { ...(testSection ? { 'data-test-section': testSection + '-' + item.value } : {}) }>
                <div className="oui-steps__dot"></div>
                <div className="oui-steps__label">{item.label}</div>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default Steps;

