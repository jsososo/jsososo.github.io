
import { fromJS } from 'immutable';
import piggyBankReducer from '../reducer';

describe('piggyBankReducer', () => {
  it('returns the initial state', () => {
    expect(piggyBankReducer(undefined, {})).toEqual(fromJS({}));
  });
});
