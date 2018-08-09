/*
 *
 * MileStone actions
 *
 */

import {
  DEFAULT_ACTION,
  QUERY_MILE_STONE_LIST,
  SELECT_MILE_STONE_LIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function queryMileStone(data) {
  return {
    data,
    type: QUERY_MILE_STONE_LIST,
  };
}

export function selectMileStoneList(data) {
  return {
    data,
    type: SELECT_MILE_STONE_LIST,
  };
}
