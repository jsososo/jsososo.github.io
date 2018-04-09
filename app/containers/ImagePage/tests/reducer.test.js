
import { fromJS } from 'immutable';
import imagePageReducer from '../reducer';

describe('imagePageReducer', () => {
  it('returns the initial state', () => {
    expect(imagePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
