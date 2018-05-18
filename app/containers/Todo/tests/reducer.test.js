
import { fromJS } from 'immutable';
import todoReducer from '../reducer';

describe('todoReducer', () => {
  it('returns the initial state', () => {
    expect(todoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
