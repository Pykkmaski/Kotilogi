import Button from "kotilogi-app/components/Button/Button";
import HoverOverlay from "../HoverOverlay/HoverOverlay";
import { MenuProps } from "./ImageContainer";
import { useCardContext } from "../../CardContext";
import { useState } from "react";
import useGalleryContext from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryContext";
import { truncate } from "cypress/types/lodash";

export default function EventsMenu(props: MenuProps){
    const {dispatch, props: {DeleteModal}} = useGalleryContext();
    const {setMenuOpen, setShowEditModal, item} = useCardContext();

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
                    hidden={true}
                    className="danger"
                    desktopText="Poista"
                    onClick={() => {
                        dispatch({
                            type: 'select_item',
                            value: item,
                        });

                        dispatch({
                            type: 'toggle_delete_modal',
                            value: true,
                        });
                        setMenuOpen(false);
                    }}
                />
                :
                null
            }
            
        </HoverOverlay>
    );
}