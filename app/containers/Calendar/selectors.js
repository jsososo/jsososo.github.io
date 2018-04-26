import { createSelector } from 'reselect';

/**
 * Direct selector to the calendar state domain
 */
const selectCalendarDomain = (state) => state.get('calendar');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Calendar
 */

const makeSelectCalendar = () => createSelector(
  selectCalendarDomain,
  (substate) => substate.toJS()
);

export default makeSelectCalendar;
export {
  selectCalendarDomain,
};
