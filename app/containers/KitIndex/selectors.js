import { createSelector } from 'reselect';

/**
 * Direct selector to the kitIndex state domain
 */
const selectKitIndexDomain = (state) => state.get('kitIndex');

/**
 * Other specific selectors
 */


/**
 * Default selector used by KitIndex
 */

const makeSelectKitIndex = () => createSelector(
  selectKitIndexDomain,
  (substate) => substate.toJS()
);

export default makeSelectKitIndex;
export {
  selectKitIndexDomain,
};
