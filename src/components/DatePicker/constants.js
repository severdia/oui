import { getAvailableEndDatePhrase, getAvailableStartDatePhrase } from './fns';

export const constants = {
  'DAY_SIZE': 35,
  'PHRASES': {
    focusStartDate: 'Interact with the calendar and select a date.',
    chooseAvailableStartDate: getAvailableStartDatePhrase,
    chooseAvailableEndDate: getAvailableEndDatePhrase,
  },
  'SINGLE_NUM_MONTHS': 1,
  'TRANSITION_DURATION': 0,
  'VERTICAL_SPACING': 10,
};
