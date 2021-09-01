import { useSelector as defaultUseSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

export const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;
