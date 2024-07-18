/* eslint-disable react/jsx-no-bind */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';
import OutsideClickHandler from 'react-outside-click-handler';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import Input from '../Input';
import CalendarNavButton from './CalendarNavButton';
import { constants } from './constants';
import { getDateString, getCustomMonthElement } from './fns';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.props.initialDate,
      currentDateString: getDateString(this.props.initialDate),
      isFocused: this.props.isFocused,
      dayPickerIsOpen: this.props.isFocused || this.props.keepOpenAlways,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.onFocusChange({focused: this.props.isFocused});
    }
  }

  onFocusChange = ({ focused }) => {
    this.setState({
      isFocused: focused,
      dayPickerIsOpen: focused || this.props.keepOpenAlways,
    });
  }

  onDateChange = (date) => {
    this.setState({
      currentDate: date,
      currentDateString: getDateString(date),
    });
    this.props.onDateChange && this.props.onDateChange(date);
  }

  onOutsideClick = () => {
    !this.props.keepOpenAlways && this.onFocusChange({ focused: false });
  }

  onClose = () => {
    this.setState({
      dayPickerIsOpen: this.props.keepOpenOnDateSelect || this.props.keepOpenAlways,
    });
  }

  getAcceptableDateRange = (day) => {
    if (this.props.isPastDateSelectable) {
      return false;
    }
    return day.isBefore(moment()) && !day.isSame(moment(), 'day');
  }

  render() {
    const { isDisabledInput, inputId, inputLabel, inputPlaceholder, isAbsolutelyPositioned } = this.props;
    const { currentDateString, dayPickerIsOpen } = this.state;
    return (
      <OutsideClickHandler onOutsideClick={ this.onOutsideClick }>
        <div className={ classNames('oui-date-picker', isAbsolutelyPositioned && 'oui-date-picker--absolute') }>
          <div className="oui-date-picker__input-row">
            <Input
              isDisabled={ isDisabledInput }
              id={ inputId }
              isReadOnly={ true }
              label={ inputLabel }
              name="date-picker"
              onBlur={ this.onBlur }
              onFocus={ this.onFocusChange.bind(this, { focused: true }) }
              placeholder={ inputPlaceholder }
              type="text"
              value={ currentDateString }
            />
          </div>
          { dayPickerIsOpen &&
            <DayPickerSingleDateController
              date={ this.state.currentDate }
              daySize={ constants.DAY_SIZE }
              focused={ this.state.isFocused }
              hideKeyboardShortcutsPanel={ true }
              isOutsideRange={ this.getAcceptableDateRange }
              navNext={ <CalendarNavButton type="next"/> }
              navPrev={ <CalendarNavButton type="previous"/> }
              numberOfMonths={ constants.SINGLE_NUM_MONTHS }
              onClose={ this.onClose }
              onDateChange={ this.onDateChange }
              onFocusChange={ this.onFocusChange }
              phrases={ constants.PHRASES }
              renderMonthElement={ getCustomMonthElement }
              transitionDuration={ constants.TRANSITION_DURATION }
            />
          }
        </div>
      </OutsideClickHandler>
    );
  }
}

DatePicker.propTypes = {
  /** An initial date to populate the input with, must be a moment() */
  initialDate: momentPropTypes.momentObj,
  /** The id of the input, used to associate with a label */
  inputId: PropTypes.string.isRequired,
  /** The label text above the input */
  inputLabel: PropTypes.string,
  /** The text to use as the placeholder of the label */
  inputPlaceholder: PropTypes.string,
  /** When true, opens the calendar on top of other elements on the page */
  isAbsolutelyPositioned: PropTypes.bool,
  /** If true, disables the input */
  isDisabledInput: PropTypes.bool,
  /** Determines if the input is currently focused or not  */
  isFocused: PropTypes.bool,
  /** Determines if the user can choose a date in the past  */
  isPastDateSelectable: PropTypes.bool,
  /**
   * Determines if the calendar remains open no matter
   * where the user clicks on the page
   */
  keepOpenAlways: PropTypes.bool,
  /** Determines if the calendar should stay
   * open when a date has been selected,
   * but close when user clicks away
   */
  keepOpenOnDateSelect: PropTypes.bool,
  /** Function callback to perform when a date has been selected.
   * The date selected is passed as a parameter.
   * Use React.createRef(); to get access to this component's
   * onDateChange method and set it from a parent
   */
  onDateChange: PropTypes.func,
};

DatePicker.defaultProps = {
  inputLabel: 'Select Date',
  inputPlaceholder: 'Select Date',
  inputId: 'date-input-01',
  isAbsolutelyPositioned: false,
  keepOpenAlways: false,
  keepOpenOnDateSelect: false,
};

export default DatePicker;
