import { ActionType } from '../action-types';
import { CellType } from '../cell';

export type Action =
  | InsertCellAction
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction;

export type Direction =
  | 'up'
  | 'down';

export interface InsertCellAction {
  type: ActionType.INSERT_CELL;
  payload: {
    id: string;
    type: CellType;
  };
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    data: string;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
