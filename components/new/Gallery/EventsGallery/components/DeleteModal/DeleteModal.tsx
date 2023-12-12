'use client';

import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import Button from "kotilogi-app/components/Button/Button";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import BaseDeleteModal from 'kotilogi-app/components/new/Gallery/Modals/GlobalDeleteModal';

export default function DeleteModal(props: ModalProps){
    const {state} = useGalleryContext();

    const deleteFunction = async () => {
       return await serverDeleteDataByIds(state.selectedItems, 'propertyEvents');
    }

    return (
        <BaseDeleteModal
            id={props.id}
            show={props.show}
            onHide={props.onHide}
            title="Poista"
        />
    )
}