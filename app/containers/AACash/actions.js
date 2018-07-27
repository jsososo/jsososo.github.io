/*
 *
 * Aacash actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_AA_LIST,
  GET_AA_DETAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function queryAAList(data) {
  return {
    type: GET_AA_LIST,
    data,
  };
}

export function getAADetail(data) {
  return {
    type: GET_AA_DETAIL,
    data,
  };
}
