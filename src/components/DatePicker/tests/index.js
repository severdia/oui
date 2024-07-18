import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import DatePicker from '../DatePicker';
import DateRangePicker from '../DateRangePicker';
import Button from '../../Button';

describe('components/DatePicker', function() {
  it('should only render the input by default', () => {
    const component = mount(<DatePicker inputId="date-picker-01"/>);
    expect(component.find('.oui-text-input').length).toBe(1);
    expect(component.find('.DayPicker').length).toBe(0);
  });

  it('should render the calendar portion if the input isFocused', () => {
    const component = mount(<DatePicker inputId="date-picker-01" isFocused={ true }/>);
    expect(component.find('.oui-text-input').length).toBe(1);
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should not have a date initially', () => {
    const component = mount(<DatePicker inputId="date-picker-01" />);
    expect(component.find('input').instance().value).toBe('');
  });

  it('should have a date if initialDate is passed in', () => {
    const testDate = moment('2019-01-01');
    const component = mount(<DatePicker inputId="date-picker-01" initialDate={ testDate }/>);
    expect(component.find('input').instance().value).toBe('Jan 01, 2019');
  });

  it('should open the calendar when the input is focused by user', () => {
    const component = mount(<DatePicker inputId="date-picker-01" />);
    component.find('input').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should close the calendar on date selection by default', () => {
    const component = mount(<DatePicker inputId="date-picker-01" />);
    component.find('input').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
    component.find('.CalendarDay__today').simulate('click');
    expect(component.find('.DayPicker').length).toBe(0);
  });

  it('should not close the calendar on date selection if keepOpenOnDateSelect is true', () => {
    const component = mount(<DatePicker inputId="date-picker-01" keepOpenOnDateSelect={ true }/>);
    component.find('input').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
    component.find('.CalendarDay__today').simulate('click');
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should not close the calendar on focus change when keepOpenAlways is true', () => {
    const component = mount(
      <div>
        <DatePicker
          inputId="date-picker-01"
          keepOpenAlways={ true }
        />
        <input className="test-input" id="test"/>
      </div>
    );
    expect(component.find('.DayPicker').length).toBe(1);
    component.find('.test-input').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should not allow past dates by default', () => {
    const component = mount(<DatePicker inputId="date-picker-01"/>);
    component.find('input').simulate('focus');
    expect(component.find('td[aria-disabled=true]').length).toBeGreaterThan(1);
  });

  it('should allow past dates if isPastDateSelectable is true', () => {
    const component = mount(<DatePicker inputId="date-picker-01" isPastDateSelectable={ true }/>);
    component.find('input').simulate('focus');
    expect(component.find('td[aria-disabled=true]').length).toBe(0);
  });

  it('should add default label and placeholder to the input', () => {
    const component = mount(<DatePicker inputId="date-picker-01"/>);
    expect(component.find('.oui-date-picker__input-row').containsMatchingElement(<label>Select Date</label>)).toBe(true);
    expect(component.find('[placeholder="Select Date"]').exists()).toBe(true);
  });

  it('should render a custom label and placeholder when passed in', () => {
    const customLabel = 'Please select a start date';
    const customPlaceholder = 'Start Date';
    const component = mount(
      <DatePicker
        inputId="date-picker-01"
        inputLabel={ customLabel }
        inputPlaceholder={ customPlaceholder }
      />
    );
    expect(component.find('.oui-date-picker__input-row').containsMatchingElement(<label>{customLabel}</label>)).toBe(true);
    expect(component.find(`[placeholder='${customPlaceholder}']`).exists()).toBe(true);
  });
});

describe('components/DateRangePicker', function() {
  it('should only render the inputs by default', () => {
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
      />
    );
    expect(component.find('.oui-text-input').length).toBe(2);
    expect(component.find('.DayPicker').length).toBe(0);
  });

  it('should render the calendar when focusedInput is passed in', () => {
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-02"
        endDateInputId="end-date-picker-02"
        focusedInput="startDate"
      />
    );
    expect(component.find('.oui-text-input').length).toBe(2);
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should not have any dates initially', () => {
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
      />
    );
    expect(component.find('input[id="start-date-picker-01"]').instance().value).toBe('');
    expect(component.find('input[id="end-date-picker-01"]').instance().value).toBe('');

  });

  it('should have a start date if initialStartDate is passed in', () => {
    const testDate = moment('2019-01-01');
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
        initialStartDate={ testDate }
      />
    );
    expect(component.find('input[id="start-date-picker-01"]').instance().value).toBe('Jan 01, 2019');
    expect(component.find('input[id="end-date-picker-01"]').instance().value).toBe('');
  });

  it('should open the calendar when the input is focused by user', () => {
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
      />
    );
    component.find('input[id="start-date-picker-01"]').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should close the calendar on date selection by default', () => {
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
      />
    );
    component.find('input[id="start-date-picker-01"]').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
    component.find('.CalendarDay__today').simulate('click');
    component.find('.CalendarDay__lastDayOfWeek[aria-disabled=false]').first().simulate('click');
    expect(component.find('.DayPicker').length).toBe(0);
  });

  it('should not close the calendar on date selection if keepOpenOnDateSelect is true', () => {
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
        keepOpenOnDateSelect={ true }
      />
    );
    component.find('input[id="start-date-picker-01"]').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
    component.find('.CalendarDay__today').simulate('click');
    component.find('.CalendarDay__lastDayOfWeek[aria-disabled=false]').first().simulate('click');
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should not close the calendar on focus change when keepOpenAlways is true', () => {
    const component = mount(
      <div>
        <DateRangePicker
          startDateInputId="start-date-picker-01"
          endDateInputId="end-date-picker-01"
          focusedInput="startDate"
          keepOpenAlways={ true }
        />
        <input className="test-input" id="test"/>
      </div>
    );
    component.find('input[id="start-date-picker-01"]').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
    component.find('.test-input').simulate('focus');
    expect(component.find('.DayPicker').length).toBe(1);
  });

  it('should add custom labels and placeholders when passed in', () => {
    const customLabel = 'Please select a start date';
    const customPlaceholder = 'Pick a Date';
    const component = mount(
      <div>
        <DateRangePicker
          startDateInputId="start-date-picker-01"
          startDateInputLabel={ customLabel }
          startDateInputPlaceholder={ customPlaceholder }
          endDateInputId="end-date-picker-01"
          focusedInput="startDate"
          keepOpenAlways={ true }
        />
        <input className="test-input" id="test"/>
      </div>
    );
    expect(component.find(`[label='${customLabel}']`).exists()).toBe(true);
    expect(component.find(`[placeholder='${customPlaceholder}']`).exists()).toBe(true);
  });

  it('should add borderless and absolute classes when isBorderless and isAbsolutelyPositioned are true', () => {
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
        isBorderless={ true }
        isAbsolutelyPositioned={ true }
      />
    );
    expect(component.find('.oui-date-picker--absolute').length).toBe(1);
    expect(component.find('.oui-date-picker--borderless').length).toBe(1);
  });

  it('should add buttons for all preset options passed in', () => {
    const presetPanelOptions = [
      {
        'label': 'Last 7 days',
        'startDate': moment().subtract(7, 'days'),
        'endDate': moment(),
      },
      {
        'label': 'Last 30 days',
        'startDate': moment().subtract(30, 'days'),
        'endDate': moment(),
      },
    ];
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
        presetPanelOptions={ presetPanelOptions }
      />
    );
    expect(component.find('.oui-date-picker__range-panel')
      .containsMatchingElement(<button><span>Last 7 days</span></button>)).toBe(true);
  });

  it('should add a button row for any panel buttons passed in', () => {
    const clickMock = jest.fn();
    const panelButtons = [
      <Button key={ 0 } style="plain" onClick={ clickMock }>Clear</Button>,
      <Button key={ 1 } style="highlight" onClick={ clickMock }>Apply</Button>,
    ];
    const component = mount(
      <DateRangePicker
        startDateInputId="start-date-picker-01"
        endDateInputId="end-date-picker-01"
        focusedInput="startDate"
        panelButtons={ panelButtons }
      />
    );
    expect(component.find('.oui-button-row--right')
      .containsMatchingElement(<button>Clear</button>)).toBe(true);
  });

  it('should pass onDatesChange via panelButtons when array is used (without render props pattern)', () => {
    const applyMock = jest.fn();
    const clearMock = jest.fn();
    const onDatesChangeMock = jest.fn();

    const component = mount(
      <DateRangePicker
        endDateInputId="end-date-picker-01"
        focusedInput='startDate'
        initialStartDate={ moment('2019-01-01') }
        initialEndDate={ moment('2019-12-31') }
        isPastDateSelectable={ true }
        keepOpenOnDateSelect={ true }
        onDatesChange={ onDatesChangeMock }
        panelButtons={ [
          <Button
            key={ 0 }
            style="plain"
            onClick={ clearMock }
            testSection="date-range-picker-clear-button">
            Clear
          </Button>,
          <Button
            key={ 1 }
            style="highlight"
            onClick={ applyMock }
            testSection="date-range-picker-apply-button">
            Apply
          </Button>,
        ] }
        startDateInputId="start-date-picker-01"
      />
    );

    expect(component.find('[data-test-section="date-range-picker-start-date-input"]').props().value).toBe('Jan 01, 2019');
    expect(component.find('[data-test-section="date-range-picker-end-date-input"]').props().value).toBe('Dec 31, 2019');
    expect(applyMock).toHaveBeenCalledTimes(0);
    expect(clearMock).toHaveBeenCalledTimes(0);
    expect(onDatesChangeMock).toHaveBeenCalledTimes(0);

    component.find('[data-test-section="date-range-picker-apply-button"]').simulate('click');
    expect(applyMock).toHaveBeenCalledTimes(1);
    expect(clearMock).toHaveBeenCalledTimes(0);
    expect(onDatesChangeMock).toHaveBeenCalledTimes(0);

    component.find('[data-test-section="date-range-picker-clear-button"]').simulate('click');
    expect(applyMock).toHaveBeenCalledTimes(1);
    expect(clearMock).toHaveBeenCalledTimes(1);
    expect(onDatesChangeMock).toHaveBeenCalledTimes(0);

    expect(component.find('[data-test-section="date-range-picker-start-date-input"]').props().value).toBe('Jan 01, 2019');
    expect(component.find('[data-test-section="date-range-picker-end-date-input"]').props().value).toBe('Dec 31, 2019');
  });

  it('should pass onDatesChange via panelButtons when render props pattern is used', () => {
    /* eslint-disable react/jsx-no-bind */
    const applyMock = jest.fn();
    const onDatesChangeMock = jest.fn();

    const component = mount(
      <DateRangePicker
        endDateInputId="end-date-picker-01"
        focusedInput='startDate'
        initialStartDate={ moment('2019-01-01') }
        initialEndDate={ moment('2019-12-31') }
        isPastDateSelectable={ true }
        keepOpenOnDateSelect={ true }
        onDatesChange={ onDatesChangeMock }
        panelButtons={ ({ onDatesChange }) => ([
          <Button
            key={ 0 }
            style="plain"
            onClick={ () => onDatesChange({ startDate: null, endDate: null }) }
            testSection="date-range-picker-clear-button">
            Clear
          </Button>,
          <Button
            key={ 1 }
            style="highlight"
            onClick={ applyMock }
            testSection="date-range-picker-apply-button">
            Apply
          </Button>,
        ]) }
        startDateInputId="start-date-picker-01"
      />
    );

    expect(component.find('[data-test-section="date-range-picker-start-date-input"]').props().value).toBe('Jan 01, 2019');
    expect(component.find('[data-test-section="date-range-picker-end-date-input"]').props().value).toBe('Dec 31, 2019');
    expect(applyMock).toHaveBeenCalledTimes(0);
    expect(onDatesChangeMock).toHaveBeenCalledTimes(0);

    component.find('[data-test-section="date-range-picker-apply-button"]').simulate('click');
    expect(applyMock).toHaveBeenCalledTimes(1);
    expect(onDatesChangeMock).toHaveBeenCalledTimes(0);

    component.find('[data-test-section="date-range-picker-clear-button"]').simulate('click');
    expect(applyMock).toHaveBeenCalledTimes(1);
    expect(onDatesChangeMock).toHaveBeenCalledTimes(1);
    expect(onDatesChangeMock).toBeCalledWith({ endDate: null, startDate: null });

    expect(component.find('[data-test-section="date-range-picker-start-date-input"]').props().value).toBe('');
    expect(component.find('[data-test-section="date-range-picker-end-date-input"]').props().value).toBe('');
    /* eslint-enable react/jsx-no-bind */
  });
});
