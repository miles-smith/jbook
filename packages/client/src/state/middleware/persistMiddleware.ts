import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { Action } from '../actions';
import { ActionType } from '../action-types';
import { saveCells } from '../action-creators';

interface persistMiddlewareArgs {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}

export const persistMiddleware = ({ dispatch, getState }: persistMiddlewareArgs) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      const mutationActions = [
        ActionType.INSERT_CELL,
        ActionType.UPDATE_CELL,
        ActionType.DELETE_CELL,
        ActionType.MOVE_CELL
      ];

      if(mutationActions.includes(action.type)) {
        if (timer) {
          clearTimeout(timer);
        };

        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
