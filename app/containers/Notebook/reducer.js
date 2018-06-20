/*
 *
 * Notebook reducer
 *
 */

import { fromJS } from 'immutable';
import Storage from '../../utils/Storage';
import {
  DEFAULT_ACTION,
  UPDATE_NOTEBOOK,
  SELECT_TAGS,
  CHANGE_TAGS,
} from './constants';

const initialState = fromJS({
  list: [],
  tags: [],
  sTags: [],
  tagsBmob: {},
});

function notebookReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_NOTEBOOK:
      return state
        .set('list', fromJS(action.data));
    case CHANGE_TAGS:
      return state
        .set('tagsBmob', fromJS(action.data || {}))
        .set('tags', fromJS(action.data ? action.data.notebook : []));
    case SELECT_TAGS:
      const userName = Storage.get('user').split('-')[0];
      Storage.set(`p_n_select_tags_${userName}`, action.data || [], true);
      return state
        .set('sTags', fromJS(action.data || []));
    default:
      return state;
  }
}

export default notebookReducer;
