"use client";

import { createContext, useContext} from "react";
import { ActionT } from "./Gallery.reducer";
import style from './style.module.scss';
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useGallery, GalleryStateType } from "./Gallery.hooks";

type GalleryProps = React.PropsWithChildren & {
    /**
     * The title displayed in the header of the gallery.
     */
    title: string,

    /**
     * The modal displayed when the global add-button of the gallery is pressed.
     */
    AddModal?: React.FC<{
        show: boolean,
        onHide: () => void
    }>,

    /**
     * The modal displayed when an object-cards open-button is pressed.
     */
    EditModal?: React.FC<{
        show: boolean,
        onHide: () => void
        item: any,
    }>,

    /**
     * The modal displayed when the global delete button of the gallery is pressed.
     */
    DeleteModal?: React.FC<ModalProps>,

    /**
     * Name of the database table containing the data to be displayed.
     */
    tableName: Kotilogi.Table,

    /**
     * Query object passed to knex.
     */
    query: {refId: Kotilogi.IdType, mimeType?: Kotilogi.MimeType, type?: 'heat' | 'water' | 'electric'},

    /**
     * For development purposes, Explicitly state this gallery is unsupported.
     */

    unsupported?: boolean,
}

type GalleryContextValueType = {
    state: GalleryStateType,
    props: GalleryProps,
    dispatch: React.Dispatch<ActionT>,
}

const GalleryContext = createContext<GalleryContextValueType | null>(null);

export function Gallery(props: GalleryProps){
    const {state, dispatch} = useGallery(props.tableName, props.query);

    const contextValue: GalleryContextValueType = {
        state,
        props,
        dispatch,
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            <div className={style.galleryContainer}>
                {props.children}
            </div>
        </GalleryContext.Provider>
    )
}

export function useGalleryContext(){
    const context = useContext(GalleryContext);
    if(!context) throw new Error('Gallery context is null!');
    return context;
}