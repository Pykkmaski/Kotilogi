"use client";

import { useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Modal from "kotilogi-app/components/Modals/Modal";
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import {toast} from 'react-hot-toast';
import serverDeleteFilesByIds from "kotilogi-app/actions/serverDeleteFilesByIds";
import { serverGetData } from "kotilogi-app/actions/serverGetData";

export default function DeleteButton(props: GalleryWithDelete.DeleteButtonProps){
    const {state, dispatch, contentType, dbTableName, refId} = useGalleryContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    async function deleteSelected(){
        try{
            var result: boolean = false;
            const fileContent: GalleryBase.ContentType[] = ['property_file', 'property_image', 'event_file', 'event_image'];

            if(fileContent.includes(contentType)){
                result = await serverDeleteFilesByIds(state.selectedItemIds, dbTableName!);
            }
            else{
                result = await serverDeleteDataByIds(state.selectedItemIds, dbTableName!);
            }

            if(!result) throw new Error('Failed to delete data!');

            const currentData = await serverGetData(dbTableName, {ref_id: refId}, false);
            dispatch({
                type: 'set_data',
                value: currentData,
            });

            toast.success('Kohteiden poisto onnistui!');
            
        }
        catch(err){
            console.log(err.message);
            toast.error('Kohteiden poisto epäonnistui!');
        }
        finally{
            dispatch({type: 'reset_selected'});
            setShowDeleteModal(false);
        }
    }

    return (
        <>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} id="gallery-delete-modal">
                <Modal.Header>Poista Valinnat</Modal.Header>
                <Modal.Body>
                    Haluatko varmasti poistaa valitsemasi kohteet?
                </Modal.Body>
                <Modal.Footer>
                    <button className="secondary" onClick={() => setShowDeleteModal(false)}>Ei</button>
                    <button className="primary" onClick={deleteSelected}>Kyllä</button>
                </Modal.Footer>
            </Modal>
            <button className="secondary" onClick={() => setShowDeleteModal(true)} disabled={!state.selectedItemIds.length}>Poista</button>
        </>
    )
}