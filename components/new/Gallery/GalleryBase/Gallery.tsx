"use client";

import { CSSProperties, createContext, useContext, useState} from "react";
import { ActionType } from "./Gallery.reducer";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useGallery, StateType } from "./Gallery.hooks";
import { Heading } from "kotilogi-app/components/Heading";
import { Group } from "kotilogi-app/components/Group";
import { ListItemProps } from "kotilogi-app/components/ListItem/ListItem";
import { DeleteModal } from "kotilogi-app/components/Modals/DeleteModal";
import {PrimaryButton} from "kotilogi-app/components/Button/PrimaryButton";
import {SecondaryButton} from "kotilogi-app/components/Button/SecondaryButton";
import { AdContainer } from "@/components/AdContainer";

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

    const getButtons = () => {
        const buttons: JSX.Element[] = [];

        if(DeleteModal){
            buttons.push(
                <SecondaryButton onClick={() => setShowDeleteModal(true)} hidden={!state.selectedItems.length}>Poista</SecondaryButton>
            );
        }

        if(AddModal){
            buttons.push(
                <PrimaryButton onClick={() => setShowAddModal(true)} className="shadow-md min-h-8">
                    <Group direction="row" gap={4}>
                        <img src="/icons/plus.png" className="invert aspect-square w-[25px]"/>
                    </Group>
                </PrimaryButton>
            );
        }

        return buttons;
    }
    
    return (
        <>
            {AddModal ? <AddModal id="gallery-add-modal" show={showAddModal} onHide={() => setShowAddModal(false)}/> : null}
            {DeleteModal ? <DeleteModal id="gallery-delete-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)}/> : null}

            <div className="mb-4 w-full">
                <Group direction="row" justify="between" align="center">
                    <Heading>{props.title}</Heading>

                    <Group direction="row" gap={4} align="center" justify="center">
                        {props.children}   
                        {...getButtons()}
                    </Group>
                </Group>
            </div>
            
        </>
    );
}

type BodyProps = {
    displayStyle?: 'vertical' | 'horizontal',
    itemComponent: React.FC<ListItemProps<any>>,
    errorElement: JSX.Element,
}

function Body({displayStyle = 'vertical', itemComponent: ItemComponent, ...props}: BodyProps){
    const {state, data} = useGalleryContext();

    const bodyStyle: CSSProperties = {
        display: 'flex',
        flexFlow: displayStyle === 'vertical' ? 'column' : 'row wrap',
        gap: '0.5rem',
    }

    return (
        data.length ? 

        <div style={bodyStyle}>
            {
                data.map((item, index: number) => {
                    const isSelected = state.selectedItems.includes(item);
                    return <ItemComponent selected={isSelected} item={item} key={`gallery-item-${index}`}/>
                })
            }
        </div>
        :
        props.errorElement
    );
}

type GalleryProps<T extends Kotilogi.ItemType> = React.PropsWithChildren & {
    data: T[],
}

type GalleryContextValueType = {
    data: Kotilogi.ItemType[],
    state: StateType<Kotilogi.ItemType>,
    props: GalleryProps<Kotilogi.ItemType>,
    dispatch: React.Dispatch<ActionType<Kotilogi.ItemType>>,
}

const GalleryContext = createContext<GalleryContextValueType | null>(null);

export function Gallery<T extends Kotilogi.ItemType>(props: GalleryProps<T>){
    const {state, dispatch} = useGallery(props.data);

    const contextValue: GalleryContextValueType = {
        data: props.data,
        state,
        props,
        dispatch,
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            <div className="relative flex flex-col flex-1 text-white z-[2] w-full">
                {props.children}
            </div>
        </GalleryContext.Provider>
    );
}

Gallery.Header = Header;
Gallery.Body = Body;

/**The global modal displayed when deleting multiple selected items at once. */
Gallery.DeleteModal = <T extends Kotilogi.ItemType>({deleteMethod, ...props}: ModalProps & {deleteMethod: (item: T) => Promise<void>}) => {
    const {state, dispatch} = useGalleryContext();

    return (
        <DeleteModal 
            {...props} 
            targetsToDelete={state.selectedItems} 

            deleteMethod={deleteMethod}

            resetSelectedTargets={() => dispatch({
                type: 'reset_selected',
            })}/>
    )
}

export function useGalleryContext(){
    const context = useContext(GalleryContext);
    if(!context) throw new Error('useGalleryContext must be used within the scope of a GalleryContext!');
    return context;
}