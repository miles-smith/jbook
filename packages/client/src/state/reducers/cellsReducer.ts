import produce from 'immer';
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

const reducer = produce((state: CellGroupState = initialState, action: Action) => {
  switch(action.type) {
    case ActionType.FETCH_CELLS:
      state.loading = true;
      state.error   = null;

      return state;
    case ActionType.FETCH_CELLS_COMPLETE:
      state.loading = false;
      state.order   = action.payload.map((cell) => cell.id);
      state.data    = action.payload.reduce((accumulator, cell) => {
        accumulator[cell.id] = cell;
        return accumulator;
      }, {} as CellGroupState['data']);

      return state;
    case ActionType.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error   = action.payload;

      return state;
    case ActionType.SAVE_CELLS_ERROR:
      state.error = action.payload;
      
      return state;
    case ActionType.INSERT_CELL:
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        data: '',
      }

      state.data[cell.id] = cell;

      const insertIndex = state.order.findIndex(id => id === action.payload.id);

      if(insertIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(insertIndex + 1, 0, cell.id);
      }

      return state;
    case ActionType.UPDATE_CELL:
      state.data[action.payload.id].data = action.payload.data;

      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter(id => id !== action.payload);

      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex(id => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if(targetIndex < 0 || targetIndex > state.order.length - 1)
        return state;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    default:
      return state;
  };
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
}

export default reducer;
