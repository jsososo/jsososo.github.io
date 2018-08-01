/*
 *
 * PiggyBank actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PIGGY_DETAIL,
  GET_PIGGY_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getPiggyList(data) {
  return {
    type: GET_PIGGY_LIST,
    data,
  };
}

export function getPiggyDetail(data) {
  return {
    type: GET_PIGGY_DETAIL,
    data,
  };
}
