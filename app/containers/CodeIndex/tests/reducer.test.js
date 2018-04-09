
import { fromJS } from 'immutable';
import codeIndexReducer from '../reducer';

describe('codeIndexReducer', () => {
  it('returns the initial state', () => {
    expect(codeIndexReducer(undefined, {})).toEqual(fromJS({}));
  });
});
