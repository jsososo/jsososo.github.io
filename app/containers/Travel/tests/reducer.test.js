
import { fromJS } from 'immutable';
import travelReducer from '../reducer';

describe('travelReducer', () => {
  it('returns the initial state', () => {
    expect(travelReducer(undefined, {})).toEqual(fromJS({}));
  });
});
