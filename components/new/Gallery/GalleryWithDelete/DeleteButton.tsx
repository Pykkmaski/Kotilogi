"use client";

import useGalleryContext from "../GalleryBase/GalleryContext";

type Props = {
    toggleModal: (state: boolean) => void,
}
export default function DeleteButton(props: Props){
    const {state, dispatch, dbTableName, refId} = useGalleryContext();

    return (
        <button className="secondary" onClick={() => props.toggleModal(true)} disabled={!state.selectedItemIds.length}>Poista</button>
    )
}