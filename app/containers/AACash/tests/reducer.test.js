
import { fromJS } from 'immutable';
import aacashReducer from '../reducer';

describe('aacashReducer', () => {
  it('returns the initial state', () => {
    expect(aacashReducer(undefined, {})).toEqual(fromJS({}));
  });
});
