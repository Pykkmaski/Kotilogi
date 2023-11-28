import style from './style.module.scss';
import { useState } from "react";
import NextImage from 'next/image';
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import Link from 'next/link';
import { serverDeleteDataByIds } from 'kotilogi-app/actions/serverDeleteDataByIds';
import useGalleryContext from '../../../../GalleryContext';
import toast from 'react-hot-toast';
import serverDeleteFilesByIds from 'kotilogi-app/actions/serverDeleteFilesByIds';
import Modal, { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import Button from 'kotilogi-app/components/Button/Button';

/**
 * Deletion modal to display before a deletion is executed
 */

function DeleteModal(props: ModalProps & {item: {id: Kotilogi.IdType, title: string}}){
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
        }

        setLoading(false);
    }
    
    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            <Modal.Header>Vahvista Poisto</Modal.Header>
            <Modal.Body>
                {
                    contentType === 'image' ? 
                    'Haluatko varmasti poistaa kuvan ' + props.item.title
                    :
                    contentType === 'file' ?
                    'Haluatko varmasti poistaa tiedoston ' + props.item.title
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

/**
 * Menu to display on top of the image when the mouse is hovered on top.
 */
function FileContainerMenu(props: {
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

export default function FileContainer(props: {
    /**
     * The item to display
     */
    item: any,
}){

    const [loading, setLoading]             = useState(true);
    const [showImageMenu, setShowImageMenu] = useState(false);
    const {props: {contentType}}            = useGalleryContext();

    const onError = (e) => {
        console.log('Image failed to load!');
        setLoading(false);
    }
    const onLoad = (e) => setLoading(false);

    const imageSrc = `/api/files/${props.item.id}`;

    return (
        <div 
            className={style.fileContainer} 
            onMouseEnter={() => setShowImageMenu(true)} 
            onMouseLeave={() => setShowImageMenu(false)} 
            onBlur={() => setShowImageMenu(false)}
        >
            <FileContainerMenu 
                visible={showImageMenu} 
                openDestination={imageSrc} 
                item={props.item}
            />
            {
                false  ? 
                <Spinner size={'2rem'}/>
                :
                contentType === 'image' ? 
                <NextImage
                    src={imageSrc}
                    fill={true}
                    alt="Kuva"
                    onLoadingComplete={onLoad}
                    onError={onError}
                />
                :
                contentType === 'file' ? 
                <iframe src={`/api/files/${props.item.id}`}/>
                :
                null
            }
        </div>
    )
}