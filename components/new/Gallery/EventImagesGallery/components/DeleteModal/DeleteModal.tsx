'use client';

import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import Button from "kotilogi-app/components/Button/Button";
import Modal from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import toast from "react-hot-toast";
import DeleteModalBase from "../../../Modals/DeleteModalBase";

export default function DeleteModal(props: {show: boolean, onHide: () => void}){
    const {state} = useGalleryContext();

    const deleteFunction = async () => {
       return await serverDeleteDataByIds(state.selectedItemIds, 'propertyEvents');
    }

    return (
        <DeleteModalBase
            show={props.show}
            onHide={props.onHide}
            id="event-delete-modal"
            headerText="Poista Tapahtumia"
            deleteFunction={deleteFunction}
            message="Haluatko varmasti poistaa valitsemasi tapahtumat?"
            successMessage="Tapahtumien poisto onnistui!"
            errorMessage="Tapahtumien poisto epäonnistui!"
        />
    )
}