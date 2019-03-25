import { createSelector } from 'reselect';

/**
 * Direct selector to the travel state domain
 */
const selectTravelDomain = (state) => state.get('travel');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Travel
 */

const makeSelectTravel = () => createSelector(
  selectTravelDomain,
  (substate) => substate.toJS()
);

export default makeSelectTravel;
export {
  selectTravelDomain,
};
