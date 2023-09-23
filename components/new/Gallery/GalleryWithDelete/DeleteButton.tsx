"use client";

import Button from "kotilogi-app/components/Button/Button";
import useGalleryContext from "../GalleryBase/GalleryContext";
import BinIcon from 'kotilogi-app/assets/bin.png';

type Props = {
    toggleModal: (state: boolean) => void,
}

export default function DeleteButton(props: Props){
    const {state} = useGalleryContext();

    return (
        <Button 
            className="secondary" 
            mobileIconSrc={BinIcon} 
            desktopText="Poista" 
            onClick={() => props.toggleModal(true)} 
            disabled={!state.selectedItemIds.length || state.isLoading}
        />
    )
}