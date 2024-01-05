'use client';

import { useReducer } from "react";
import {reducer} from './Gallery.reducer';

export function useGallery(){
    const initialState = {
        selectedItems: [],
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    return [state, dispatch];
}