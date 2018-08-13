/*
 *
 * CashBook reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SHOW_CHARTS,
  SHOW_INPUT,
  SET_TIME_RANGE,
  SHOW_ALL_DATA,
  SET_TIME_TYPE,
  SET_SPACE_TIME,
  RESET_DATA,
} from './constants';

const initialState = fromJS({
  showInput: true,
  showAllData: true,
  timeRange: [],
  space: 1,
  spaceType: 'M',
  needFresh: false,
  lineData: {
    data: {},
    types: [],
    xAxis: [],
  },
  pieData: [],
});

function cashBookReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SHOW_CHARTS:
      return state
        .set('needFresh', false)
        .set('lineData', fromJS(action.data.lineData))
        .set('pieData', fromJS(action.data.pieData))
        .set('showInput', false);
    case SHOW_INPUT:
      return state
        .set('showInput', true);
    case SET_TIME_RANGE:
      return state
        .set('needFresh', true)
        .set('timeRange', fromJS(action.data));
    case SHOW_ALL_DATA:
      return state
        .set('needFresh', true)
        .set('showAllData', !state.get('showAllData'));
    case SET_TIME_TYPE:
      return state
        .set('needFresh', true)
        .set('spaceType', action.data);
    case SET_SPACE_TIME:
      return state
        .set('needFresh', true)
        .set('space', action.data);
    case RESET_DATA:
      return fromJS({
        showInput: true,
        showAllData: true,
        timeRange: [],
        space: 1,
        spaceType: 'M',
        needFresh: false,
        lineData: {
          data: {},
          types: [],
          xAxis: [],
        },
        pieData: [],
      });
    default:
      return state;
  }
}

export default cashBookReducer;
