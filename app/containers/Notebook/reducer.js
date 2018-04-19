/*
 *
 * Notebook reducer
 *
 */

import { fromJS } from 'immutable';
import arrayHelper from '../../utils/arrayHelper';
import {
  DEFAULT_ACTION,
  UPDATE_NOTEBOOK,
  SELECT_TAGS,
  CHANGE_TAGS,
} from './constants';

const localNotebook = window.localStorage.getItem('p_notebook') ? JSON.parse(window.localStorage.getItem('p_notebook')) : [];
const tags = window.localStorage.getItem('p_n_tags') ? JSON.parse(window.localStorage.getItem('p_n_tags')) : ['1', '2', '3'];

const initialState = fromJS({
  localNotebook,
  list: localNotebook,
  tags,
});

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_NOTEBOOK:
      return state
        .set('localNotebook', fromJS(action.data))
        .set('list', fromJS(action.data));
    case CHANGE_TAGS:
      return state
        .set('tags', fromJS(action.data));
    case SELECT_TAGS:
      if (action.data.length) {
        return state
          .set('list', fromJS(state.toJS().localNotebook.filter((item) => arrayHelper.hasDuplicate(item.tags, action.data))));
      } else {
        return state
          .set('list', state.get('localNotebook'));
      }
    default:
      return state;
  }
}

export default notebookReducer;
