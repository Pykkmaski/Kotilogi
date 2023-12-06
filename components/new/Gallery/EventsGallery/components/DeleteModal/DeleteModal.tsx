'use client';

import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import Button from "kotilogi-app/components/Button/Button";
import Modal from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import BaseDeleteModal from '@/components/new/Gallery/Modals/DeleteModal';

export default function DeleteModal(props: {show: boolean, onHide: () => void}){
    const {state} = useGalleryContext();

    const deleteFunction = async () => {
       return await serverDeleteDataByIds(state.selectedItems, 'propertyEvents');
    }

    return (
        <BaseDeleteModal
            id={`events-delete-modal`}
            show={props.show}
            onHide={props.onHide}
            title="Poista"
        />
    )
}