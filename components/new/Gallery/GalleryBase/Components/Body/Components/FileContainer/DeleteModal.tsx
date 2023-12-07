

import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import useGalleryContext from "../../../../GalleryContext";
import { useState } from "react";
import serverDeleteFilesByIds from "kotilogi-app/actions/serverDeleteFilesByIds";
import toast from "react-hot-toast";
import Button from "kotilogi-app/components/Button/Button";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";

/**
 * Deletion modal to display before a deletion is executed
 */

export default function DeleteModal(props: ModalProps & {item: {id: Kotilogi.IdType, fileName: string}}){
    const {props: {contentType, tableName}} = useGalleryContext();
    const [loading, setLoading]             = useState(false);

    const deleteFile = async () => {
        setLoading(true);
        const result = await serverDeleteFilesByIds([props.item.id], tableName);

        if(!result){
            toast.error(
                contentType === 'image' ? 
                'Kuvan poisto epäonnistui!'
                :
                contentType === 'file' ? 
                'Tiedoston poisto epäonnistui!'
                :
                ''
            );
        }
        else{
            toast.success(
                contentType === 'image' ?
                'Kuvan poisto onnistui!'
                :
                contentType === 'file' ? 
                'Tiedoston poisto onnistui!'
                :
                ''
            );
            props.onHide();
        }

        //Revalidate the page if on property images or files.
        if(tableName === 'propertyImages' || tableName === 'propertyFiles'){
            const path = (
                contentType === 'image' ? '/auth/properties/new/[property_id]/images'
                :
                '/auth/properties/new/[property_id]/files'
            );

            await serverRevalidatePath(path);
        }
        setLoading(false);
    }
    
    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            <Modal.Header>Vahvista Poisto</Modal.Header>
            <Modal.Body>
                {
                    contentType === 'image' ? 
                    <>Haluatko varmasti poistaa kuvan <strong>{props.item.fileName}</strong></>
                    :
                    contentType === 'file' ?
                    <>Haluatko varmasti poistaa tiedoston <strong>{props.item.fileName}</strong></>
                    :
                    null
                }
                ?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="primary"
                    desktopText="Peruuta"
                    onClick={props.onHide}
                    disabled={loading}
                />

                <Button
                    className="secondary"
                    desktopText="Poista"
                    onClick={deleteFile}
                    loading={loading}
                    disabled={loading}
                />
            </Modal.Footer>
        </Modal>
    );
}
