import Link from "next/link";
import useGalleryContext from "../../../../GalleryContext";
import { useState } from "react";
import style from './style.module.scss';
import DeleteModal from "./DeleteModal";

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
            <span className={buttonClassName}>Aseta pääkuvaksi</span>
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