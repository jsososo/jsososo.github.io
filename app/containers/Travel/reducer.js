/*
 *
 * Travel reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  UPDATE_INFO,
  UPDATE_LIST,
  UPDATE_RAW_INFO,
} from './constants';

const initialState = fromJS({
  list: [],
  rawInfo: {},
  info: {
    title: '',
    desc: '',
    takes: [], // 记得带的物品
    userIds: [], // 用户列表
    dateList: [
      {
        title: '',
      },
    ], // 日期列表
  },
});

function travelReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_INFO:
      return state
        .set('info', fromJS(action.data));
    case UPDATE_LIST:
      return state
        .set('list', fromJS(action.data));
    case UPDATE_RAW_INFO:
      return state
        .set('rawInfo', fromJS(action.data));
    default:
      return state;
  }
}

export default travelReducer;
