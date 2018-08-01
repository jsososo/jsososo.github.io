import { createSelector } from 'reselect';

/**
 * Direct selector to the piggyBank state domain
 */
const selectPiggyBankDomain = (state) => state.get('piggyBank');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PiggyBank
 */

const makeSelectPiggyBank = () => createSelector(
  selectPiggyBankDomain,
  (substate) => substate.toJS()
);

export default makeSelectPiggyBank;
export {
  selectPiggyBankDomain,
};
