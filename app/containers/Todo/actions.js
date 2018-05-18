/*
 *
 * Todo actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_LIST,
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
