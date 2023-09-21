"use client";

import serverDeleteFilesByIds from "kotilogi-app/actions/serverDeleteFilesByIds";
import useGalleryContext from "../../../GalleryBase/GalleryContext";
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import { serverGetData } from "kotilogi-app/actions/serverGetData";
import {toast} from 'react-hot-toast';
import { useState } from "react";
import Modal from "kotilogi-app/components/Modals/Modal";
import Entry from "../../../GalleryBase/Components/ActionSelector/Components/Entry/Entry";

export default function DeleteActionEntry(){
    const {state, dbTableName, refId, dispatch} = useGalleryContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    async function deleteSelected(){
        try{
            var result: boolean = false;
            const fileTables: Kotilogi.Table[] = ['propertyFiles', 'propertyImages', 'eventFiles', 'eventImages'];

            if(fileTables.includes(dbTableName)){
                result = await serverDeleteFilesByIds(state.selectedItemIds, dbTableName!);
            }
            else{
                result = await serverDeleteDataByIds(state.selectedItemIds, dbTableName!);
            }

            if(!result) throw new Error('Failed to delete data!');

            const currentData = await serverGetData(dbTableName, {refId: refId}, false);
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
                    <button className="secondary" onClick={deleteSelected}>Kyllä</button>
                    <button className="primary" onClick={() => setShowDeleteModal(false)}>Ei</button>
                </Modal.Footer>
            </Modal>

            <Entry text="Poista Valinnat" onClick={() => setShowDeleteModal(true)}/>
        </>
        
    )
}

