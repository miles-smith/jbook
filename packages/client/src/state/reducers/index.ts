import { combineReducers } from 'redux';
import CellsReducer from './cellsReducer';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  cells: CellsReducer,
});

export default reducers;
