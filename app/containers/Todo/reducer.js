/*
 *
 * To do reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_LIST,
  QUERY_LIST,
} from './constants';

const initialState = fromJS({
  list: [],
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case QUERY_LIST:
      return state
        .set('list', fromJS(action.data));
    default:
      return state;
  }
}

export default todoReducer;
