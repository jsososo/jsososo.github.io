import { createSelector } from 'reselect';

/**
 * Direct selector to the development state domain
 */
const selectDevelopmentDomain = (state) => state.get('development');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Development
 */

const makeSelectDevelopment = () => createSelector(
  selectDevelopmentDomain,
  (substate) => substate.toJS()
);

export default makeSelectDevelopment;
export {
  selectDevelopmentDomain,
};
