import { useReducer } from 'react';
import { reducer } from './Gallery.reducer';
import { ObjectDataType } from 'kotilogi-app/models/types';

export type StateType<T extends ObjectDataType> = {
  data: T[];
  selectedItems: T[];
};

export function useGallery<T extends ObjectDataType>(initialData: T[]) {
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
