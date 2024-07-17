import { useReducer } from 'react';
import { reducer } from './Gallery.reducer';
import { AppObjectType } from 'kotilogi-app/models/types';

export type StateType<T extends AppObjectType> = {
  data: T[];
  selectedItems: T[];
};

export function useGallery<T extends AppObjectType>(initialData: T[]) {
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
