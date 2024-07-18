/* eslint-disable react/jsx-no-bind */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import OutsideClickHandler from 'react-outside-click-handler';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import Button from '../Button';
import ButtonRow from '../ButtonRow';
import Input from '../Input';
import CalendarNavButton from './CalendarNavButton';
import { constants } from './constants';
import { getDateString, getCustomMonthElement } from './fns';

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: this.props.initialEndDate,
      focusedInput: this.props.focusedInput || null,
      dayPickerIsOpen: !!this.props.focusedInput || this.props.keepOpenAlways,
      startDate: this.props.initialStartDate,
      startDateString: getDateString(this.props.initialStartDate),
      endDateString: getDateString(this.props.initialEndDate),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.focusedInput !== this.props.focusedInput) {
      this.onFocusChange(this.props.focusedInput);
    }
  }

  onFocusChange = (focusedInput) => {
    if (this.props.keepOpenOnDateSelect || this.props.keepOpenAlways) {
      this.setState({
        focusedInput: !focusedInput ? 'startDate' : focusedInput,
        dayPickerIsOpen: true,
      });
    } else {
      this.setState({
        focusedInput: focusedInput,
        dayPickerIsOpen: !!focusedInput,
      });
    }
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate: startDate,
      endDate: endDate,
      startDateString: getDateString(startDate),
      endDateString: getDateString(endDate),
    });
    this.props.onDatesChange && this.props.onDatesChange({ startDate, endDate });
  };

  onOutsideClick = () => {
    !this.props.keepOpenAlways && this.setState({
      dayPickerIsOpen: false,
    });
  };

  onClose = () => {
    const dayPickerShouldRemainOpen = this.props.keepOpenOnDateSelect || this.props.keepOpenAlways;
    if (dayPickerShouldRemainOpen) {
      this.setState({
        dayPickerIsOpen: true,
      });
    }
  };

  getAcceptableDateRange = (day) => {
    if (this.props.isPastDateSelectable) {
      return false;
    }
    return day.isBefore(moment()) && !day.isSame(moment(), 'day');
  };

  renderPresetButtons = (presetPanelOptions) => {
    var presetButtons = presetPanelOptions.map(({label, startDate, endDate}, index) => {
      const isSelected = startDate === this.state.startDate && endDate === this.state.endDate;
      const classes = classNames(
        'oui-date-picker__range-preset-option',
        isSelected && 'oui-date-picker__range-preset-option--active',
      );

      return (
        <li
          className={ classes }
          key={ index }>
          <Button style="unstyled" width="full" onClick={ this.onDatesChange.bind(this, {startDate, endDate}) }>
            <span className="link">
              {label}
            </span>
          </Button>
        </li>
      );
    });
    return presetButtons;
  }

  renderSidePanel = () => {
    const presetPanelOptions = this.props.presetPanelOptions;
    const panelOptionsArePresent = presetPanelOptions && presetPanelOptions.length > 0;
    const panelButtons = this.props.panelButtons;
    return (<div className="oui-date-picker__range-panel">
      { panelOptionsArePresent &&
        <div className="oui-date-picker__range-presets">
          <ul className="oui-date-picker__range-preset-list push-triple--bottom">
            {this.renderPresetButtons(presetPanelOptions)}
          </ul>
        </div>
      }
      { // render panel buttons via render props if a function is provided
        panelButtons && (
          typeof panelButtons === 'function' ? (
            <ButtonRow rightGroup={ panelButtons({ onDatesChange: this.onDatesChange }) }/>
          ) : (
            <ButtonRow rightGroup={ panelButtons }/>
          )
        )
      }
    </div>);
  };

  render() {
    const {
      endDateInputId,
      endDateInputLabel,
      endDateInputPlaceholder,
      isAbsolutelyPositioned,
      isBorderless,
      panelButtons,
      presetPanelOptions,
      startDateInputId,
      startDateInputLabel,
      startDateInputPlaceholder,
    } = this.props;
    const {
      dayPickerIsOpen,
      endDateString,
      startDateString,
    } = this.state;

    let infoPanelPosition = null;
    if (presetPanelOptions) {
      infoPanelPosition = 'after';
    } else if (!presetPanelOptions && panelButtons) {
      infoPanelPosition = 'bottom';
    }

    const computedClassNames = classNames(
      'oui-date-picker',
      isBorderless && 'oui-date-picker--borderless',
      isAbsolutelyPositioned && 'oui-date-picker--absolute',
    );

    return (
      <OutsideClickHandler onOutsideClick={ this.onOutsideClick }>
        <div className={ computedClassNames }>
          <div className="oui-date-picker__input-row">
            <div className={ classNames('push--right', isBorderless && 'flex--1') }>
              <Input
                id={ startDateInputId }
                isReadOnly={ true }
                label={ startDateInputLabel }
                name="startDate"
                onFocus={ () => this.onFocusChange('startDate') }
                placeholder={ startDateInputPlaceholder }
                testSection="date-range-picker-start-date-input"
                type="text"
                value={ startDateString }
              />
            </div>
            <div className={ classNames(isBorderless && 'flex--1') }>
              <Input
                id={ endDateInputId }
                isReadOnly={ true }
                label={ endDateInputLabel }
                name="endDate"
                onFocus={ () => this.onFocusChange('endDate') }
                placeholder={ endDateInputPlaceholder }
                testSection="date-range-picker-end-date-input"
                type="text"
                value={ endDateString }
              />
            </div>
          </div>
          { dayPickerIsOpen &&
            <DayPickerRangeController
              calendarInfoPosition={ infoPanelPosition }
              daySize={ constants.DAY_SIZE }
              endDate={ this.state.endDate }
              focusedInput={ this.state.focusedInput }
              hideKeyboardShortcutsPanel={ true }
              isOutsideRange={ this.getAcceptableDateRange }
              navNext={ <CalendarNavButton type="next"/> }
              navPrev={ <CalendarNavButton type="previous"/> }
              numberOfMonths={ 2 }
              onClose={ this.onClose }
              onDatesChange={ this.onDatesChange }
              onFocusChange={ this.onFocusChange }
              phrases={ constants.PHRASES }
              renderCalendarInfo={ this.renderSidePanel }
              renderMonthElement={ getCustomMonthElement }
              startDate={ this.state.startDate }
              transitionDuration={ constants.TRANSITION_DURATION }
            />
          }
        </div>
      </OutsideClickHandler>
    );
  }
}

DateRangePicker.propTypes = {
  /** The id of the end date input, used to associate with a label */
  endDateInputId: PropTypes.string.isRequired,
  /** The label of the end date input */
  endDateInputLabel: PropTypes.string,
  /** The placeholder text of the end date input */
  endDateInputPlaceholder: PropTypes.string,
  /** Used to indicate the current active input,
   * aka which date is about to be selected,
   * or null if neither is active
   */
  focusedInput: PropTypes.oneOf(['startDate', 'endDate', null]),
  /** An initial end date to populate the end date input with,
   * must be type moment()
   */
  initialEndDate: momentPropTypes.momentObj,
  /** An initial end date to populate the end date input with,
   * must be type moment()
   */
  initialStartDate: momentPropTypes.momentObj,
  /** When true, opens the calendar on top of other elements on the page */
  isAbsolutelyPositioned: PropTypes.bool,
  /** When true, removes the border around the calendar portion */
  isBorderless: PropTypes.bool,
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
  /** Function callback to perform when either a start date
   * or end date has been selected.
   * The dates are passed as a parameter object with startDate and endDate
   * as keys.
   * For access in panelButtons row items, use render prop function that returns
   * an array.
   */
  onDatesChange: PropTypes.func,
  /** An array of buttons to display with the
   * calendar, such as Cancel and Apply. If presetPanelOptions
   * are also defined, the buttons will be to the right of the calendar.
   * Otherwise, they are directly below the calendar.
   * Use render prop function that returns an array to get access to component's
   * onDatesChange method
   */
  panelButtons: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  /** Array of objects used to render preset buttons to the right
   * of the calendar. Each object must have a startDate, endDate, and label.
   */
  presetPanelOptions: PropTypes.arrayOf(PropTypes.shape({
    endDate: momentPropTypes.momentObj,
    label: PropTypes.string,
    startDate: momentPropTypes.momentObj,
  })),
  /** The id of the start date input, used to associate with a label */
  startDateInputId: PropTypes.string.isRequired,
  /** The label of the start date input */
  startDateInputLabel: PropTypes.string,
  /** The placeholder text of the start date input */
  startDateInputPlaceholder: PropTypes.string,
};

DateRangePicker.defaultProps = {
  endDateInputLabel: 'End Date',
  endDateInputPlaceholder: 'End Date',
  focusedInput: null,
  isAbsolutelyPositioned: false,
  initialStartDate: null,
  initialEndDate: null,
  keepOpenAlways: false,
  keepOpenOnDateSelect: false,
  startDateInputLabel: 'Start Date',
  startDateInputPlaceholder: 'Start Date',
};

export default DateRangePicker;
