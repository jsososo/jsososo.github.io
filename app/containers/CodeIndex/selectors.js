import { createSelector } from 'reselect';

/**
 * Direct selector to the codeIndex state domain
 */
const selectCodeIndexDomain = (state) => state.get('codeIndex');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CodeIndex
 */

const makeSelectCodeIndex = () => createSelector(
  selectCodeIndexDomain,
  (substate) => substate.toJS()
);

export default makeSelectCodeIndex;
export {
  selectCodeIndexDomain,
};
