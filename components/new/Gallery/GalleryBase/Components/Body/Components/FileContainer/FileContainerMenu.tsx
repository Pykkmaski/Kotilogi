import Link from "next/link";
import useGalleryContext from "../../../../GalleryContext";
import { useState } from "react";
import style from './style.module.scss';
import DeleteModal from "./DeleteModal";
import serverSetAsMainImage from "kotilogi-app/actions/serverSetAsMainImage";
import toast from "react-hot-toast";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";

/**
 * Menu to display on top of the image when the mouse is hovered on top.
 */

export default function FileContainerMenu(props: {
    visible: boolean
    /**
     * The url where the image is found. Used when pressing the open-button.
     */
    openDestination: string,
    
    /**
     * The item being displayed
     */
    item: any,
}){

    const {props: {tableName, contentType}}     = useGalleryContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const buttonClassName = style.controlButton;

    const DeleteButton = <span className={`${buttonClassName} danger`} onClick={() => setShowDeleteModal(true)}>Poista</span>
    
    const buttons = (
        contentType === 'image' ?
        <>
            <Link className={buttonClassName} href={props.openDestination} target="_blank">Avaa</Link>
            <span className={buttonClassName} onClick={async () => {
                const refType = (
                    tableName === 'propertyFiles' ? 'property'
                    :
                    tableName === 'eventFiles' ? 'event'
                    :
                    null
                );

                const error = await serverSetAsMainImage(props.item.id, props.item.refId, refType);
                if(error !== 0){
                    toast.error('Pääkuvan asetus epäonnistui!');
                }
                else{
                    toast.success('Pääkuva asetettu onnistuneesti!');
                    const path = (
                        refType === 'property' ? '/auth/properties/'
                        :
                        refType === 'event' ? '/auth/properties/new/[property_id]/events'
                        :
                        ''
                    );

                    await serverRevalidatePath(path);
                }

            }}>Aseta pääkuvaksi</span>
            {DeleteButton}
        </>
        :
        contentType === 'file' ? 
        <>
            <Link className={buttonClassName} href={props.openDestination} target="_blank">Avaa</Link>
            {DeleteButton}
        </>
        :
        null
    );

    const deleteModalId = (
        contentType === 'image' ? 
        'image-delete-modal-' + props.item.id
        :
        contentType === 'file' ? 
        'file-delete-modal-' + props.item.id
        :
        ''
    );

    return (
        <>
            <DeleteModal item={props.item} show={showDeleteModal} onHide={() => setShowDeleteModal(false)} id={deleteModalId}/>
            <div className={style.fileMenu} hidden={!props.visible}>
                {buttons}
            </div>
        </>
        
    );
}