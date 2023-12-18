'use client';

import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import { ModalProps } from "kotilogi-app/components/Modals/Modal";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import BaseDeleteModal from 'kotilogi-app/components/new/Gallery/Modals/GlobalDeleteModal/GlobalDeleteModal';

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
        />
    )
}