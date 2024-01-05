'use client';

import { useReducer } from "react";
import { StateType, reducer } from "./PageWithData.reducer";

export function usePageWithData<DataT extends Kotilogi.ItemType>(data: DataT[]){
    const initialValue: StateType<DataT> = {
        items: data,
        selectedItems: [],
        displayedItems: data,
    }

    const [state, dispatch] = useReducer(reducer<DataT>, initialValue);
    
    return {state, dispatch} as const;
}