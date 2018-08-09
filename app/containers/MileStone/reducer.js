/*
 *
 * MileStone reducer
 *
 */

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
  QUERY_MILE_STONE_LIST,
  SELECT_MILE_STONE_LIST,
} from './constants';

const initialState = fromJS({
  list: {}, // 按照日期为key分类好的list
  rawList: [], // 原始的array
  tags: [],
  selectTag: '',
});

function mileStoneReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case QUERY_MILE_STONE_LIST:
      return state
        .set('rawList', fromJS(action.data.list))
        .set('tags', fromJS(action.data.tags));
    case SELECT_MILE_STONE_LIST:
      return state
        .set('selectTag', action.data.tag)
        .set('list', fromJS(action.data.list));
    default:
      return state;
  }
}

export default mileStoneReducer;
