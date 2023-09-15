"use client";

import { useEffect, useState } from "react";
import useGalleryContext from "../GalleryContext"

export default function SelectAllButton(){
    const {dispatch, state} = useGalleryContext();
    const [buttonState, setState] = useState<'closed' | 'open'>('closed');

    const selectAll = (e) => {
        dispatch({
            type: 'select_all',
        });
    }

    const deselectAll = (e) => {
        dispatch({
            type: 'reset_selected',
        });
    }

    useEffect(() => {
        if(state.selectedItemIds.length){
            //There are selected items
            setState('open');
        }
        else{
            //There are no selected items
            setState('closed');
        }
    }, [state.selectedItemIds.length]);

    return (
        buttonState === 'closed' ? 
        <button type="button" className="secondary" onClick={selectAll}>Valitse Kaikki</button>
        :
        <button type="button" className="secondary" onClick={deselectAll}>Kumoa Valinnat</button>
    );
}