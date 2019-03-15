
import { fromJS } from 'immutable';
import codingDemoReducer from '../reducer';

describe('codingDemoReducer', () => {
  it('returns the initial state', () => {
    expect(codingDemoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
