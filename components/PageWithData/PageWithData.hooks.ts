'use client';

import { useReducer } from "react";
import { StateType, reducer } from "./PageWithData.reducer";

export function usePageWithData(data: any[]){
    const initialValue: StateType = {
        items: data,
        selectedItems: [],
        displayedItems: data,
    }

    const [state, dispatch] = useReducer(reducer, initialValue);
    
    return {state, dispatch} as const;
}