/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('user').toJS()
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectBoxes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('boxes').toJS()
);

const makeSelectReqLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('reqLoading')
);

export {
  selectGlobal,
  makeSelectUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectBoxes,
  makeSelectReqLoading,
};
