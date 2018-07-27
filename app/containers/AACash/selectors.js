import { createSelector } from 'reselect';

/**
 * Direct selector to the aacash state domain
 */
const selectAacashDomain = (state) => state.get('aacash');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Aacash
 */

const makeSelectAacash = () => createSelector(
  selectAacashDomain,
  (substate) => substate.toJS()
);

export default makeSelectAacash;
export {
  selectAacashDomain,
};
