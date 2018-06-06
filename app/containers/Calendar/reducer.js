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
const initialState = fromJS({
  calendarInfo: {
    year: timer().year,
    month: timer().month,
  },
  list: {},
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
    case QUERY_LIST:
      return state
        .set('list', fromJS(action.data));
    default:
      return state;
  }
}

export default calendarReducer;
