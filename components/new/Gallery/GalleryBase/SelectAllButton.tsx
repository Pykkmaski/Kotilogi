"use client";

import useGalleryContext from "./GalleryContext"

export default function SelectAllButton(){
    const {dispatch} = useGalleryContext();

    const onClickHandler = (e) => {
        dispatch({
            type: 'select_all',
        });
    }
    return (
        <button type="button" className="secondary" onClick={onClickHandler}>Valitse Kaikki</button>
    )
}