import { createSelector } from 'reselect';

/**
 * Direct selector to the mileStone state domain
 */
const selectMileStoneDomain = (state) => state.get('mileStone');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MileStone
 */

const makeSelectMileStone = () => createSelector(
  selectMileStoneDomain,
  (substate) => substate.toJS()
);

export default makeSelectMileStone;
export {
  selectMileStoneDomain,
};
