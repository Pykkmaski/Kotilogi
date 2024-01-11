'use client';

import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton"
import SecondaryButton from "../Button/SecondaryButton"
import { Group } from "../Group/Group"
import { ModalProps } from "../Modals/Modal";

type ControlsWithAddAndDeleteProps = {
    id: string,
    deleteDisabled: boolean,
    AddModalComponent: React.FC<ModalProps>,
}

export function ControlsWithAddAndDelete({AddModalComponent, ...props}: ControlsWithAddAndDeleteProps){
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    return (
        <>
            <AddModalComponent 
                show={showAddModal} 
                onHide={() => setShowAddModal(false)} 
                id={`${props.id}-add-modal`}/>

           
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