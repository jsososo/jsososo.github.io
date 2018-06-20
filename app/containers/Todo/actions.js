/*
 *
 * Todo actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_LIST,
  QUERY_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
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
