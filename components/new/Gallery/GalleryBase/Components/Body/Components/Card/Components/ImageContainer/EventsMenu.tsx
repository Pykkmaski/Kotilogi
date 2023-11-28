import Button from "kotilogi-app/components/Button/Button";
import HoverOverlay from "../HoverOverlay/HoverOverlay";
import { MenuProps } from "./ImageContainer";
import { useCardContext } from "../../CardContext";
import { useState } from "react";
import useGalleryContext from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryContext";

export default function EventsMenu(props: MenuProps){
    const {dispatch, props: {DeleteModal}} = useGalleryContext();
    const {setMenuOpen, setShowEditModal, setShowDeleteModal, item} = useCardContext();

    return (
        <HoverOverlay visible={props.showMenu}>
            <Button
                className="primary"
                desktopText="Avaa"
                onClick={() => {
                    setShowEditModal(true);
                    setMenuOpen(false);
                }}
            />

            {
                DeleteModal ? 
                <Button
                    className="danger"
                    desktopText="Poista"
                    onClick={() => {
                        setShowDeleteModal(true);
                        setMenuOpen(false);
                    }}
                />
                :
                null
            }
            
        </HoverOverlay>
    );
}