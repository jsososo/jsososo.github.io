
import { fromJS } from 'immutable';
import indexPageReducer from '../reducer';

describe('indexPageReducer', () => {
  it('returns the initial state', () => {
    expect(indexPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
