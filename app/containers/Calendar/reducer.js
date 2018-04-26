/*
 *
 * Calendar reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_CALENDAR_INFO,
  CHANGE_SELECTED_DATE,
  UPDATE_LIST,
  QUERY_LIST,
} from './constants';

import timer from '../../utils/timer';

const today = timer();
const localList = window.localStorage.getItem('p_c_list') ? JSON.parse(window.localStorage.getItem('p_c_list')) : { nowId: 1 };

const initialState = fromJS({
  calendarInfo: {
    year: timer().year,
    month: timer().month,
  },
  localList,
  list: localList[today.str('YYYYMMDD')] || [],
  selected: today,
});

function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_CALENDAR_INFO:
      return state
        .set('calendarInfo', fromJS(action.data));
    case CHANGE_SELECTED_DATE:
      return state
        .set('selected', fromJS(action.data));
    case UPDATE_LIST:
      return state
        .set('localList', fromJS(action.data));
    case QUERY_LIST:
      return state
        .set('list', fromJS(state.get('localList').toJS()[action.data] || []));
    default:
      return state;
  }
}

export default calendarReducer;
