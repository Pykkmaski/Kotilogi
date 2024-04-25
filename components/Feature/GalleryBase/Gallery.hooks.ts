import { useReducer } from 'react';
import { reducer } from './Gallery.reducer';

export type StateType<T extends Kotidok.ItemType> = {
  data: T[];
  selectedItems: T[];
};

export function useGallery<T extends Kotidok.ItemType>(initialData: T[]) {
  const initialState: StateType<T> = {
    data: initialData,
    selectedItems: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}
