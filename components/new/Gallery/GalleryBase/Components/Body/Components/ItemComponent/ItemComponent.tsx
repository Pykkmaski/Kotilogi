'use client';

import { ModalProps } from "kotilogi-app/components/Modals/Modal";
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

export default function ItemComponent(props: React.PropsWithChildren & {
    item: any,
    DeleteModal?: React.FC<ModalProps>
}){
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