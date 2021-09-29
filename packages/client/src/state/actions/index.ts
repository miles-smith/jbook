import { ActionType } from '../action-types';
import { CellType } from '../cell';

export type Action =
  | InsertCellAction
  | MoveCellAction
  | UpdateCellAction
  | DeleteCellAction
  | BundleStartAction
  | BundleCompleteAction;

export type Direction =
  | 'up'
  | 'down';

export interface InsertCellAction {
  type: ActionType.INSERT_CELL;
  payload: {
    id: string | null;
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

export interface BundleStartAction {
  type: ActionType.BUNDLE_START,
  payload: {
    id: string;
  }
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE,
  payload: {
    id: string,
    bundle: {
      code:  string;
      error: string;
    }
  }
}