import { createSelector } from 'reselect';

/**
 * Direct selector to the searchPage state domain
 */
const selectSearchPageDomain = (state) => state.get('searchPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchPage
 */

const makeSelectSearchPage = () => createSelector(
  selectSearchPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSearchPage;
export {
  selectSearchPageDomain,
};
