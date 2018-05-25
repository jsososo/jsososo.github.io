/*
 *
 * Notebook reducer
 *
 */

import { fromJS } from 'immutable';
import arrayHelper from '../../utils/arrayHelper';
import Storage from '../../utils/Storage';
import {
  DEFAULT_ACTION,
  UPDATE_NOTEBOOK,
  SELECT_TAGS,
  CHANGE_TAGS,
} from './constants';

const localNotebook = Storage.get('p_notebook', true, '[]');
const tags = Storage.get('p_n_tags', true, '[]');

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
      Storage.set('p_n_select_tags', action.data, true);
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
