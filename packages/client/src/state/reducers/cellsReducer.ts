import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellGroupState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  };
};

const initialState: CellGroupState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (state: CellGroupState = initialState, action: Action): CellGroupState => {
  switch(action.type) {
    case ActionType.INSERT_CELL:
    case ActionType.UPDATE_CELL:
    case ActionType.DELETE_CELL:
    case ActionType.MOVE_CELL:
    default:
      return state;
  };
};

export default reducer;
