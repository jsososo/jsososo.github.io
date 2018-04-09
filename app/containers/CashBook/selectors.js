import { createSelector } from 'reselect';

/**
 * Direct selector to the cashBook state domain
 */
const selectCashBookDomain = (state) => state.get('cashBook');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CashBook
 */

const makeSelectCashBook = () => createSelector(
  selectCashBookDomain,
  (substate) => substate.toJS()
);

export default makeSelectCashBook;
export {
  selectCashBookDomain,
};
