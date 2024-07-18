import { withState, withHandlers, compose } from 'recompose';

export const withToggle = compose(
  withState('isOpen', 'toggle', ({ isOpen }) => (isOpen || false)),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ toggle }) => (e) => toggle((current) => !current),
  })
);
