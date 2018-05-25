/*
 *
 * To do reducer
 *
 */

import { fromJS } from 'immutable';
import localStorage from '../../utils/Storage';
import {
  DEFAULT_ACTION,
  UPDATE_LIST,
} from './constants';

const list = localStorage.get('p_t_list', true, '[]');

const initialState = fromJS({
  list,
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_LIST:
      localStorage.set('p_t_list', action.data, true);
      return state
        .set('list', fromJS(action.data));
    default:
      return state;
  }
}

export default todoReducer;
