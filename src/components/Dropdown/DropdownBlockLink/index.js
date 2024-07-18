import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class DropdownBlockLink extends React.Component {
  static defaultProps = {
    isLink: true,
  };

  static propTypes = {
    /** Content to be shown in the menu option */
    children: PropTypes.node.isRequired,
    /** should this be a link or nonclickable text */
    isLink: PropTypes.bool.isRequired,
    /** Minimum width of the list item, useful if
      * you need to have a block of description text */
    minWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** Click handler for the menu option */
    onClick: PropTypes.func.isRequired,
    /** Used for data-test-section attribute on the link */
    testSection: PropTypes.string,
    /** Used for data-track-id attribute on the link */
    trackId: PropTypes.string,
  };

  onClick = () => {
    this.props.onClick();
  };

  render() {
    const styleProps = {};
    if (this.props.minWidth) {
      styleProps.minWidth = this.props.minWidth;
    }
    return (
      <div
        className={ classNames({
          'link': this.props.isLink,
          'isSelected': !this.props.isLink,
          'oui-dropdown__block-link': this.props.isLink,
        }) }
        style={ styleProps }
        { ...(this.props.testSection ? { 'data-test-section': this.props.testSection } : {}) }
        { ...(this.props.trackId ? { 'data-track-id': this.props.trackId } : {}) }
        onClick={ this.onClick }>
        { this.props.children }
      </div>
    );
  }
}
