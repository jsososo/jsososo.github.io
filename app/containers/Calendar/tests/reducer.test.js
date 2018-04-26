
import { fromJS } from 'immutable';
import calendarReducer from '../reducer';

describe('calendarReducer', () => {
  it('returns the initial state', () => {
    expect(calendarReducer(undefined, {})).toEqual(fromJS({}));
  });
});
