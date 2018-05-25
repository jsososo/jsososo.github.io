/*
 *
 * MileStone reducer
 *
 */

import { fromJS } from 'immutable';
import localStorage from '../../utils/Storage';

import {
  DEFAULT_ACTION,
} from './constants';

const calendarObj = localStorage.get('p_c_list', true, {});
let list = [{id: 'today', title: '今天', time: new Date()}];

Object.values(calendarObj).forEach((dailyList) => {
  if ((typeof dailyList) === 'object') {
    dailyList.forEach((item) => {
      if (item.milestone) {
        list.push(item);
      }
    });
  }
});

list = list.sort((a, b) => a.time - b.time);

const initialState = fromJS({
  localList: list,
  list: JSON.parse(JSON.stringify(list)),
});

function mileStoneReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default mileStoneReducer;
