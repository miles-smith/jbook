import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { RootState } from '../reducers';
import {
  Action,
  Direction,
  InsertCellAction,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
} from '../actions';
import { Cell, CellType } from '../cell';
import bundle from '../../bundler';

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: e.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { cells: { data, order } } = getState();
    const cells = order.map((id) => data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (e) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: e.message,
      });
    }
  };
};

export const insertCell = (id: string | null, type: CellType): InsertCellAction => {
  return {
    type: ActionType.INSERT_CELL,
    payload: { id, type }
  }
};

export const updateCell = (id: string, data: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: { id, data },
  }
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  }
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction }
  }
};

export const createBundle = (id: string, data: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id,
      }
    });

    const result = await bundle(data);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle: result,
      }
    });
  }
};
