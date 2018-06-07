/*
 *
 * MileStone reducer
 *
 */

import { fromJS } from 'immutable';
import localStorage from '../../utils/Storage';

import {
  DEFAULT_ACTION,
  QUERY_MILE_STONE_LIST,
} from './constants';

const initialState = fromJS({
  list: {},
});

function mileStoneReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case QUERY_MILE_STONE_LIST:
      return state
        .set('list', fromJS(action.data));
    default:
      return state;
  }
}

export default mileStoneReducer;
