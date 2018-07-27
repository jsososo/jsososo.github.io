/*
 *
 * Aacash reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_AA_LIST,
  GET_AA_DETAIL,
} from './constants';

const initialState = fromJS({
  list: [],
  detail: {},
});

function aacashReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_AA_LIST:
      return state
        .set('list', fromJS(action.data));
    case GET_AA_DETAIL:
      return state
        .set('detail', fromJS(action.data));
    default:
      return state;
  }
}

export default aacashReducer;
