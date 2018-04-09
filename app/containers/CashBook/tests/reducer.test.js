
import { fromJS } from 'immutable';
import cashBookReducer from '../reducer';

describe('cashBookReducer', () => {
  it('returns the initial state', () => {
    expect(cashBookReducer(undefined, {})).toEqual(fromJS({}));
  });
});
