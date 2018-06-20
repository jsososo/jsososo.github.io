/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'person_web/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'person_web/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'person_web/App/LOAD_REPOS_ERROR';
export const URL_CHANGE = 'person_web/App/URL_CHANGE';
export const INIT_APP = 'person_web/App/INIT_APP';

export const QUERY_BOXES = 'person_web/APP/QUERY_BOXES';

export const GET_USER_INFO = 'person_web/App/GET_USER_INFO';

export const GET_BOX_INFO = 'person_web/App/GET_BOX_INFO';
