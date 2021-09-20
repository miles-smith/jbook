import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code:    string;
    error:   string;
  } | undefined
}

const initialState: BundlesState = {};

const reducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      state[action.payload.id] = {
        loading: true,
        code:    '',
        error:   '',
      }

      return state
    case ActionType.BUNDLE_COMPLETE:
      const { bundle } = action.payload;

      state[action.payload.id] = {
        loading: false,
        code:    bundle.code,
        error:   bundle.error,
      }

      return state;
    default:
      return state;
  }
});

export default reducer;
