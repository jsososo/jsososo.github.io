
import { fromJS } from 'immutable';
import mileStoneReducer from '../reducer';

describe('mileStoneReducer', () => {
  it('returns the initial state', () => {
    expect(mileStoneReducer(undefined, {})).toEqual(fromJS({}));
  });
});
