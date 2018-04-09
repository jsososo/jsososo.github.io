
import { fromJS } from 'immutable';
import kitIndexReducer from '../reducer';

describe('kitIndexReducer', () => {
  it('returns the initial state', () => {
    expect(kitIndexReducer(undefined, {})).toEqual(fromJS({}));
  });
});
