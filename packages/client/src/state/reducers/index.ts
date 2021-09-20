import { combineReducers } from 'redux';
import CellsReducer from './cellsReducer';
import bundlesReducer from './bundlesReducer';

export type RootState = ReturnType<typeof reducers>;

const reducers = combineReducers({
  cells:   CellsReducer,
  bundles: bundlesReducer,
});

export default reducers;
