import { useReducer } from "react";
import {reducer} from "./Gallery.reducer";

export type StateType<T extends Kotilogi.ItemType> = {
    data: T[],
    selectedItems: T[],
}

export function useGallery<T extends Kotilogi.ItemType>(initialData: T[]){
    const initialState: StateType<T> = {
        data: initialData,
        selectedItems: [],
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return {
        state,
        dispatch,
    }
}