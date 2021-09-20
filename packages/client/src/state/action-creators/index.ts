import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  Action,
  Direction,
  InsertCellAction,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
} from '../actions';
import { CellType } from '../cell';
import bundle from '../../bundler';

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
