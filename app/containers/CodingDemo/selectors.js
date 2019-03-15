import { createSelector } from 'reselect';

/**
 * Direct selector to the codingDemo state domain
 */
const selectCodingDemoDomain = (state) => state.get('codingDemo');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CodingDemo
 */

const makeSelectCodingDemo = () => createSelector(
  selectCodingDemoDomain,
  (substate) => substate.toJS()
);

export default makeSelectCodingDemo;
export {
  selectCodingDemoDomain,
};
