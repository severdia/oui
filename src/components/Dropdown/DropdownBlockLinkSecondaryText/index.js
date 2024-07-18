import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-oui-icons';

export default function DropdownBlockLinkSecondaryText(props) {
  const testSection = props.testSection ? 'block-link-description-' + props.testSection : null;
  return (
    <div className="oui-dropdown--descriptive__content flex">
      { props.isWarning &&
        <div className="flex flex-align--center push--right">
          <Icon name='exclamation' size='small'/>
        </div>
      }
      <div className="flex flex-align--center" { ...(testSection ? { 'data-test-section': testSection } : {}) }>
        { props.secondaryText }
      </div>
    </div>
  );
}

DropdownBlockLinkSecondaryText.defaultProps = {
  isWarning: false,
  secondaryText: null,
};

DropdownBlockLinkSecondaryText.propTypes = {
  /** should show info icon */
  isWarning: PropTypes.bool,
  /** description text, if provided */
  secondaryText: PropTypes.string,
  /** test section from parent */
  testSection: PropTypes.string,
};
