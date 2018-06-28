import { createSelector } from 'reselect';

/**
 * Direct selector to the article state domain
 */
const selectArticleDomain = (state) => state.get('article');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Article
 */

const makeSelectArticle = () => createSelector(
  selectArticleDomain,
  (substate) => substate.toJS()
);

export default makeSelectArticle;
export {
  selectArticleDomain,
};
