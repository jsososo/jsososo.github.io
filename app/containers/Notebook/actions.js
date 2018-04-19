/*
 *
 * Notebook actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_NOTEBOOK,
  SELECT_TAGS,
  CHANGE_TAGS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateNotebook(data) {
  return {
    type: UPDATE_NOTEBOOK,
    data,
  };
}

export function selectTags(data) {
  return {
    type: SELECT_TAGS,
    data,
  };
}

export function changeTags(data) {
  return {
    type: CHANGE_TAGS,
    data,
  };
}
