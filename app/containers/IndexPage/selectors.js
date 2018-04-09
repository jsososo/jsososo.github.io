import { createSelector } from 'reselect';

/**
 * Direct selector to the indexPage state domain
 */
const selectIndexPageDomain = (state) => state.get('indexPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by IndexPage
 */

const makeSelectIndexPage = () => createSelector(
  selectIndexPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectIndexPage;
export {
  selectIndexPageDomain,
};
