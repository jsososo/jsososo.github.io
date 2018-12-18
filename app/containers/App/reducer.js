/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  GET_BOX_INFO,
  QUERY_BOXES,
  SET_LOADING,
  GET_USER_INFO,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  reqLoading: false,
  error: false,
  currentUser: false,
  boxes: {},
  user: {},
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_REPOS_SUCCESS:
      return state
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case GET_BOX_INFO:
      return state
        .set('boxes', fromJS(action.data));
    case GET_USER_INFO:
      return state
        .set('user', fromJS(action.data));
    case SET_LOADING:
      return state
        .set('reqLoading', fromJS(action.data));
    default:
      return state;
  }
}

export default appReducer;
