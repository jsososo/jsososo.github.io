import { createSelector } from 'reselect';

/**
 * Direct selector to the notebook state domain
 */
const selectNotebookDomain = (state) => state.get('notebook');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Notebook
 */

const makeSelectNotebook = () => createSelector(
  selectNotebookDomain,
  (substate) => substate.toJS()
);

export default makeSelectNotebook;
export {
  selectNotebookDomain,
};
