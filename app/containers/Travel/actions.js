/*
 *
 * Travel actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_INFO,
  UPDATE_LIST,
  UPDATE_RAW_INFO,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateInfo(data) {
  return {
    type: UPDATE_INFO,
    data,
  };
}

export function updateList(data) {
  return {
    type: UPDATE_LIST,
    data,
  };
}

export function updateRawInfo(data) {
  return {
    type: UPDATE_RAW_INFO,
    data,
  };
}
