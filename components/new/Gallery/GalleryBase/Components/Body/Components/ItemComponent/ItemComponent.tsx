'use client';

import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { StaticImageData } from "next/image";
import { createContext, useContext, useState } from "react";

type ContextValueType = {
    item: any,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const ItemComponentContext = createContext<ContextValueType | null>(null);

export function useItemComponentContext(){
    const context = useContext(ItemComponentContext);
    if(!context) throw new Error('ItemComponentContext cannot be null!');
    return context;
}

type ItemComponentProps = React.PropsWithChildren & {
    item: any,
    DeleteModal?: React.FC<ModalProps>
}

/**
 * A base wrapper component including functionality shared by all components representing gallery items.
 * @param props 
 * @returns 
 */
export default function ItemComponent(props: ItemComponentProps){
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    return (
        <ItemComponentContext.Provider value={{item: props.item, setShowDeleteModal}}>
            {
                props.DeleteModal ? (
                    <props.DeleteModal 
                        show={showDeleteModal} 
                        onHide={() => setShowDeleteModal(false)} 
                        id={`item-delete-modal-${props.item.id}`}
                    />
                )
                :
                null
            }
            {props.children}
        </ItemComponentContext.Provider>
    );
}