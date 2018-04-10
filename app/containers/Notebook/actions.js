/*
 *
 * Notebook actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_NOTEBOOK,
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
