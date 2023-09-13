"use client";

import useGalleryContext from "./GalleryContext"

export default function RemoveSelectionsButton(){
    const {dispatch, state} = useGalleryContext();
    const onClickHandler = (e) => {
        dispatch({
            type: 'reset_selected',
            value: [],
        });
    }
    return(
        <button type="button" className="secondary" onClick={onClickHandler} disabled={!state.selectedItemIds.length}>Kumoa Valinnat</button>
    )
}