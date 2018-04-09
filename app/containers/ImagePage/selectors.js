import { createSelector } from 'reselect';

/**
 * Direct selector to the imagePage state domain
 */
const selectImagePageDomain = (state) => state.get('imagePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ImagePage
 */

const makeSelectImagePage = () => createSelector(
  selectImagePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectImagePage;
export {
  selectImagePageDomain,
};
