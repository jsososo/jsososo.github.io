/*
 *
 * CashBook actions
 *
 */

import {
  DEFAULT_ACTION,
  SHOW_CHARTS,
  SHOW_INPUT,
  SET_TIME_RANGE,
  SHOW_ALL_DATA,
  SET_TIME_TYPE,
  SET_SPACE_TIME,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function showCharts(data) {
  return {
    type: SHOW_CHARTS,
    data,
  };
}

export function showInput() {
  return {
    type: SHOW_INPUT,
  };
}

export function setTimeRange(data) {
  return {
    type: SET_TIME_RANGE,
    data,
  };
}

export function showAllData() {
  return {
    type: SHOW_ALL_DATA,
  };
}

export function setTimeType(data) {
  return {
    type: SET_TIME_TYPE,
    data,
  };
}

export function setSpaceTime(data) {
  return {
    type: SET_SPACE_TIME,
    data,
  };
}
