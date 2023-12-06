'use client';

import { useEffect, useState } from "react";
import useGalleryContext from "@/components/new/Gallery/GalleryBase/GalleryContext";
import { CardContext, CardContextValue } from "./CardContext";
import Footer from "./Components/Footer/Footer";
import ImageContainer from "./Components/ImageContainer/ImageContainer";
import Body from "./Components/Body/Body";
import style from './style.module.scss';
import CustomDeleteModal from "kotilogi-app/components/new/Gallery/Modals/DeleteModal";

export default function Card(props: {
    item: Kotilogi.ItemType & {fileName?: string},
    destination?: string,
}){
    const {state, dispatch, props: {EditModal, DeleteModal, tableName}}    = useGalleryContext();

    //Initialize the cards selected state to true, if the item is included in the selected items list of the gallery.
    const [isSelected, setIsSelected] = useState(
        state.selectedItems.map(item => item.id).includes(props.item.id)
    );

    const [menuOpen, setMenuOpen]                               = useState(false);
    const [showEditModal, setShowEditModal]                     = useState(false);
    const [showDeleteModal, setShowDeleteModal]                 = useState(false);

    useEffect(() => {
        setIsSelected(
            state.selectedItems.map(item => item.id).includes(props.item.id)
        );
    }, [state.selectedItems]); //selectedItems is a reference to an object. This probably doesn't work.

    const imageSrcTable = tableName === 'properties' ? 'propertyFiles' : tableName === 'propertyEvents' ? 'eventFiles' : null;
    const imageUrl = (
        'mainImageId' in props.item ? 
        `/api/files/${props.item.mainImageId}?tableName=${imageSrcTable}`
        :
        `/api/files/${props.item.id}?tableName=${imageSrcTable}`
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