import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useCardContext } from "../GalleryBase/Components/Body/Components/Card/CardContext";
import Button from "kotilogi-app/components/Button/Button";
import useGalleryContext from "../GalleryBase/GalleryContext";
import serverDeleteData from "kotilogi-app/actions/serverDeleteData";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import toast from "react-hot-toast";
import { useState } from "react";
import { useItemComponentContext } from "../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent";

/**
 * Modal to display when deleting an individual item from a gallery.
 * @param props 
 * @returns 
 */
export default function ItemDeleteModal(props: ModalProps){
    const {item} = useItemComponentContext();
    const {props: {tableName}} = useGalleryContext();
    const [loading, setLoading] = useState(false);
    
    const onDeleteHandler = async () => {
        setLoading(true);
        const error = await serverDeleteData(item.id, tableName);
        if(error === 0){
            toast.success('Poisto onnistui!');
            await serverRevalidatePath('');
        }
        else{
            toast.error('Poisto epäonnistui!');
        }
        setLoading(false);
    }

    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            <Modal.Header>Poista Kohde</Modal.Header>
            <Modal.Body>
                <span>Haluatko varmasti poistaa kohteen <strong>{item.title || item.fileName}</strong>?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="secondary"
                    desktopText="Ei"
                    onClick={props.onHide}
                    disabled={loading}
                />

                <Button
                    className="primary"
                    desktopText="Kyllä"
                    onClick={onDeleteHandler}
                    disabled={loading}
                    loading={loading}
                />
            </Modal.Footer>
        </Modal>
    )
}