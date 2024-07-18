import React from 'react';
import PropTypes from 'prop-types';

const EmptyDashboard = ({
  button,
  imagePath,
  headline,
  description,
  descriptionMaxWidth,
  testSection,
}) => {
  return (
    <div
      data-oui-component={ true }
      className='flex overflow-y--scroll flex--1'
      data-test-section='layers-empty-state'
      style={{ width: '750px', margin: 'auto' }}>
      <div className='anchor--middle height--1-1 flex flex--column'>

        <div
          data-oui-component={ true }
          className='text--center soft-quad'
          data-test-section={ testSection }>

          { imagePath && (
            <div
              className="muted push-double--bottom"
              style={{ width: '550px', margin: 'auto' }}>
              <object
                data={ imagePath }
                className="svg--non-scaling-stroke display--inline"
                style={{ maxWidth: '450px', maxHeight: '290px' }}
                data-test-section={ testSection && `${testSection}-image` }
                alt=""
              />
            </div>
          ) }

          { headline && (
            <h1
              className="alpha push--bottom"
              data-test-section={ testSection && `${testSection}-headline` }>
              { headline }
            </h1>
          ) }

          { description && (
            <div
              className="muted push--bottom anchor--middle"
              style={{ maxWidth: descriptionMaxWidth }}
              data-test-section={ testSection && `${testSection}-description` }>
              { description }
            </div>
          ) }

          { button && (
            <div className="push-double--top">
              { button }
            </div>
          ) }
        </div>

      </div>
    </div>
  );
};

EmptyDashboard.propTypes = {
  /** A button, link, or other element that is actionable */
  button: PropTypes.node,
  /** A string or `div` containing longer text that describes the empty state */
  description: PropTypes.element,
  /** Max width of description. Accepts any valid CSS width value. */
  descriptionMaxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Short text about the empty state */
  headline: PropTypes.string.isRequired,
  /** Path to an image representing the empty state */
  imagePath: PropTypes.string,
  /** Identifier used to create data-test-section attributes for testing */
  testSection: PropTypes.string,
};

EmptyDashboard.getDefaultProps = {
  descriptionMaxWidth: '450px',
  testSection: 'empty-hello',
};

export default EmptyDashboard;
