'use client';

import { useEffect, useState } from "react";
import useGalleryContext from "@/components/new/Gallery/GalleryBase/GalleryContext";
import { CardContext, CardContextValue } from "./CardContext";
import Footer from "./Components/Footer/Footer";
import ImageContainer from "./Components/ImageContainer/ImageContainer";
import Body from "./Components/Body/Body";
import style from './style.module.scss';
import CardDeleteModal from "./CardDeleteModal";

export default function Card(props: {
    item: Kotilogi.ItemType & {fileName?: string},
    destination?: string,
}){
    const {state, dispatch, props: {EditModal, DeleteModal}}    = useGalleryContext();
    const [isSelected, setIsSelected]                           = useState(state.selectedItemIds.includes(props.item.id));
    const [menuOpen, setMenuOpen]                               = useState(false);
    const [showEditModal, setShowEditModal]                     = useState(false);
    const [showDeleteModal, setShowDeleteModal]                 = useState(false);

    useEffect(() => {
        setIsSelected(state.selectedItemIds.includes(props.item.id));
    }, [state.selectedItemIds]); //selectedItemIds is a reference to an object. This probably doesn't work.

    const imageUrl = (
        'mainImageId' in props.item ? 
        `/api/files/${props.item.mainImageId}`
        :
        `/api/files/${props.item.id}`
    );

    const contextValue: CardContextValue = {
        isSelected,
        item: props.item,
        dispatch,
        setMenuOpen,
        menuOpen,
        setShowEditModal,
        setShowDeleteModal,
    }

    const containerClassName = isSelected ? `${style.cardContainer} ${style.selected}` : style.cardContainer;
    
    return (
        <CardContext.Provider value={contextValue}>
            {
                EditModal ?
                <EditModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    item={props.item}
                />
                :
                null
            }

            {
                //Show a special deletion modal when explicitly deleting a single item:
                DeleteModal ?
                <CardDeleteModal
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    item={props.item}
                    id={`card-delete-modal-${props.item.id}`}
                />
                :
                null
            }

            <div className={containerClassName}>
                <ImageContainer 
                    imageUrl={imageUrl} 
                    title={props.item.title || props.item.fileName || 'Ei Otsikkoa.'}
                />
                <Body/>
                <Footer/>
            </div>
        </CardContext.Provider>
    );
}