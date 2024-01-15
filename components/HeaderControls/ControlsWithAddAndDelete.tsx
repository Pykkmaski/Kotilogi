'use client';

import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton"
import SecondaryButton from "../Button/SecondaryButton"
import { Group } from "../Group/Group"
import { ModalProps } from "../Modals/Modal";
import { DeleteModal, DeleteModalProps } from "../Modals/DeleteModal";

type ControlsWithAddAndDeleteProps = {
    id: string,
    deleteDisabled: boolean,
    AddModalComponent: React.FC<ModalProps>,
    DeleteModalComponent: React.FC<ModalProps>,
}

export function ControlsWithAddAndDelete({AddModalComponent, DeleteModalComponent, ...props}: ControlsWithAddAndDeleteProps){
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    return (
        <>
            <AddModalComponent 
                show={showAddModal} 
                onHide={() => setShowAddModal(false)} 
                id={`${props.id}-add-modal`}/>

            <DeleteModalComponent
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                id={`${props.id}-delete-modal`}/>

            <SecondaryButton 
                desktopText="Poista" 
                disabled={props.deleteDisabled}
                mobileIconSrc='/icons/bin.png'
                onClick={() => setShowDeleteModal(true)}/>

            <PrimaryButton 
                desktopText="Lisää Uusi" 
                mobileIconSrc="/icons/plus.png" 
                onClick={() => setShowAddModal(true)}/>
        </>
    )
}