/*
 *
 * PiggyBank reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_PIGGY_DETAIL,
  GET_PIGGY_LIST,
} from './constants';

const initialState = fromJS({
  list: [],
  detail: {},
});

function piggyBankReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_PIGGY_DETAIL:
      return state
        .set('detail', fromJS(action.data));
    case GET_PIGGY_LIST:
      return state
        .set('list', fromJS(action.data));
    default:
      return state;
  }
}

export default piggyBankReducer;
