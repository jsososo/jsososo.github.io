
import { fromJS } from 'immutable';
import notebookReducer from '../reducer';

describe('notebookReducer', () => {
  it('returns the initial state', () => {
    expect(notebookReducer(undefined, {})).toEqual(fromJS({}));
  });
});
