/*
 *
 * Article actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ARTICLE_LIST,
  UPDATE_SEARCH_OPTS,
  SET_ARTICLE_INFO,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getArticleList(data) {
  return {
    type: GET_ARTICLE_LIST,
    data,
  };
}

export function updateSearchOpts(data) {
  return {
    type: UPDATE_SEARCH_OPTS,
    data,
  };
}

export function setArticleInfo(data, edit = false, time) {
  return {
    type: SET_ARTICLE_INFO,
    data,
    edit,
    time,
  };
}
