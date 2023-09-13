"use client";

import { useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Modal from "kotilogi-app/components/Modals/Modal";
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import {toast} from 'react-hot-toast';
import serverDeleteFilesByIds from "kotilogi-app/actions/serverDeleteFile";
import getTableNameByContentType from '../Util/getTableNameByContentType';
import contentTypeError from "../Util/contentTypeError";

export default function DeleteButton(props: GalleryWithDelete.DeleteButtonProps){
    const {state, dispatch, contentType} = useGalleryContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    async function deleteSelected(){
        try{
            const dbTableName: Kotilogi.Table | null = getTableNameByContentType(contentType);
            if(!dbTableName) contentTypeError('DeleteButton, deleteSelected', contentType, 'Cannot determine table name.');

            var result: boolean = false;
            const fileContent: GalleryBase.ContentType[] = ['property_file', 'property_image', 'event_file', 'event_image'];

            if(fileContent.includes(contentType)){
                result = await serverDeleteFilesByIds(state.selectedItemIds, dbTableName!);
            }
            else{
                result = await serverDeleteDataByIds(state.selectedItemIds, dbTableName!);
            }

            if(!result) throw new Error('Failed to delete data!');

            const newData = [...state.data];
            for(const id of state.selectedItemIds){
                const item = newData.find(data => data.id === id);
                if(!item) continue;
    
                const index = newData.indexOf(item);
                if(index < 0) continue; //This should never be the case, but you never know.
                newData.splice(index, 1);
            }
        
            dispatch({type: 'set_data', value: newData});
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