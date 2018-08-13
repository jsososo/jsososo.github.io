/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  URL_CHANGE,
  INIT_APP,
  QUERY_BOXES,
  GET_USER_INFO,
  GET_BOX_INFO,
} from './constants';
import notice from '../../utils/notice';
import { allUserInfo } from "../../utils/constants";

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function urlChange(routeObj) {
  return {
    type: URL_CHANGE,
  };
}

export function initApp() {
  return {
    type: INIT_APP,
  }
}

// 获取方格
export function queryBoxes(data) {
  return {
    type: QUERY_BOXES,
    data,
  };
}

export function getUserInfo(data) {
  if (data.username !== '游客') {
    notice.findNotice(data.username);
    allUserInfo[data.objectId] = data;
  }
  return {
    type: GET_USER_INFO,
    data,
  };
}

export function getBoxInfo(data) {
  return {
    type: GET_BOX_INFO,
    data,
  };
}
