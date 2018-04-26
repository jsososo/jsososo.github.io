/*
 *
 * Calendar actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_CALENDAR_INFO,
  CHANGE_SELECTED_DATE,
  UPDATE_LIST,
  QUERY_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeCalendarInfo(data) {
  return {
    type: CHANGE_CALENDAR_INFO,
    data,
  };
}

export function changeSelectedDate(data) {
  return {
    type: CHANGE_SELECTED_DATE,
    data,
  };
}

export function updateList(data) {
  return {
    type: UPDATE_LIST,
    data,
  };
}

export function queryList(data) {
  return {
    type: QUERY_LIST,
    data,
  };
}
