"use client";

import { CSSProperties, createContext, useContext, useState} from "react";
import { ActionT } from "./Gallery.reducer";
import style from './style.module.scss';
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useGallery, GalleryStateType } from "./Gallery.hooks";
import Button from "kotilogi-app/components/Button/Button";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import { Heading } from "kotilogi-app/components/Heading/Heading";

function Header(props: React.PropsWithChildren & {
    title: string,
    AddModal?: React.FC<ModalProps>,

    /**The modal displayed when deleting multiple items at once. */
    DeleteModal?: React.FC<ModalProps>,
}){
    const {state} = useGalleryContext();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {AddModal, DeleteModal} = props;

    const buttons = (
        <>
            {
                DeleteModal ? <Button
                    className="secondary"
                    desktopText="Poista"
                    disabled={state.selectedItems.length === 0}
                    mobileIconSrc={'/icons/bin.png'}
                    onClick={() => setShowDeleteModal(true)}/> : null
            }

            {
                AddModal ? <Button 
                    className="primary" 
                    desktopText='Lisää Uusi' 
                    mobileIconSrc={'/icons/plus.png'}
                    onClick={() => setShowAddModal(true)}/> : null
            }
        </>
    )
    
    return (
        <>
            {AddModal ? <AddModal id="gallery-add-modal" show={showAddModal} onHide={() => setShowAddModal(false)}/> : null}
            {DeleteModal ? <DeleteModal id="gallery-delete-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)}/> : null}
            
            {props.DeleteModal}
            <div className={style.galleryHeader}>
                <div className={style.titleContainer}>
                    <Heading>{props.title}</Heading>
                </div>

                <div className={style.buttonsContainer}>
                    {props.children}   
                    {buttons}
                </div>
            </div>
        </>
        
    );
}

type BodyProps = {
    displayStyle: 'vertical' | 'horizontal',
    itemComponent: React.FC<{item: any}>,
    errorComponent: JSX.Element,
}

export default function Body({displayStyle = 'vertical', itemComponent: ItemComponent, ...props}: BodyProps){
    const {state} = useGalleryContext();

    const bodyStyle: CSSProperties = {
        display: 'flex',
        flexFlow: displayStyle === 'vertical' ? 'column' : 'row wrap',
        gap: '1rem'
    }

    return (
        state.isLoading ? <Spinner size='2rem'/>
        :
        state.error ? <Heading>Tapahtui odottamaton virhe!</Heading>
        :
        state.data.length ? 

        <div style={bodyStyle}>
            {
                state.data.map((item, index: number) => {
                    return <ItemComponent item={item} key={`gallery-item-${index}`}/>
                })
            }
        </div>
        :
        props.errorComponent
    );
}

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

Gallery.Header = Header;
Gallery.Body = Body;

export function useGalleryContext(){
    const context = useContext(GalleryContext);
    if(!context) throw new Error('Gallery context is null!');
    return context;
}