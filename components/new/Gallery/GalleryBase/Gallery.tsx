"use client";

import { CSSProperties, createContext, useContext, useState} from "react";
import { ActionType } from "./Gallery.reducer";
import style from './style.module.scss';
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useGallery, StateType } from "./Gallery.hooks";
import Button from "kotilogi-app/components/Button/Button";
import { Heading } from "kotilogi-app/components/Heading/Heading";
import { Group } from "kotilogi-app/components/Group/Group";
import { ListItemProps } from "kotilogi-app/components/ListItem/ListItem";
import { DeleteModal } from "kotilogi-app/components/Modals/DeleteModal";
import PrimaryButton from "kotilogi-app/components/Button/PrimaryButton";
import SecondaryButton from "kotilogi-app/components/Button/SecondaryButton";
import { SelectionProvider } from "kotilogi-app/components/Experimental/SelectionProvider/SelectionProvider";

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
                <PrimaryButton onClick={() => setShowAddModal(true)}>
                    <Group direction="row" gap={4} align="center">
                        <img src="/icons/plus.png" className="invert aspect-square w-[25px]"/>
                        <span>Lisää Uusi</span>
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

            <div style={{marginBottom: '1rem', paddingBottom: '0.5rem'}}>
                <Group direction="row" justify="between">
                    <Heading>{props.title}</Heading>

                    <Group direction="row" gap={4}>
                        {props.children}   
                        {...getButtons()}
                    </Group>
                </Group>
            </div>
            
        </>
    );
}

type BodyProps = {
    displayStyle: 'vertical' | 'horizontal',
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
            <div className={style.galleryContainer}>
                {props.children}
            </div>
        </GalleryContext.Provider>
    );
}

Gallery.Header = Header;
Gallery.Body = Body;

/**The global modal displayed when deleting multiple selected items at once. */
Gallery.DeleteModal = ({deleteMethod, ...props}: ModalProps & {deleteMethod: (id: string) => Promise<void>}) => {
    const {state, dispatch} = useGalleryContext();

    return (
        <DeleteModal 
            {...props} 
            targetsToDelete={state.selectedItems} 

            deleteMethod={async (id: string) => {
                await deleteMethod(id);
            }}

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