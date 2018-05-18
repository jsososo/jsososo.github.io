import { createSelector } from 'reselect';

/**
 * Direct selector to the todo state domain
 */
const selectTodoDomain = (state) => state.get('todo');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Todo
 */

const makeSelectTodo = () => createSelector(
  selectTodoDomain,
  (substate) => substate.toJS()
);

export default makeSelectTodo;
export {
  selectTodoDomain,
};
