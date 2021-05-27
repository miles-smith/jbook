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

export const insertCell = (id: string, type: CellType): InsertCellAction => {
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
