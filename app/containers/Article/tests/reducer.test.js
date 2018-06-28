
import { fromJS } from 'immutable';
import articleReducer from '../reducer';

describe('articleReducer', () => {
  it('returns the initial state', () => {
    expect(articleReducer(undefined, {})).toEqual(fromJS({}));
  });
});
