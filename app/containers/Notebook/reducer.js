/*
 *
 * Notebook reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_NOTEBOOK,
} from './constants';

const localNotebook = window.localStorage.getItem('p_notebook') ? JSON.parse(window.localStorage.getItem('p_notebook')) : [];

const initialState = fromJS({
  list: localNotebook,
});

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_NOTEBOOK:
      return state
        .set('list', fromJS(action.data));
    default:
      return state;
  }
}

export default notebookReducer;
