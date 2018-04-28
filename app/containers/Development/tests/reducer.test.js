
import { fromJS } from 'immutable';
import developmentReducer from '../reducer';

describe('developmentReducer', () => {
  it('returns the initial state', () => {
    expect(developmentReducer(undefined, {})).toEqual(fromJS({}));
  });
});
