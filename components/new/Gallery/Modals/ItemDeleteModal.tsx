import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useCardContext } from "../GalleryBase/Components/Body/Components/Card/CardContext";
import Button from "kotilogi-app/components/Button/Button";
import serverDeleteData from "kotilogi-app/actions/serverDeleteData";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import toast from "react-hot-toast";
import { useState } from "react";
import { useItemComponentContext } from "../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent";
import { useGalleryContext } from "../GalleryBase/Gallery";

/**
 * Modal to display when deleting an individual item from a gallery.
 * @param props 
 * @returns 
 */

export default function ItemDeleteModal(props: ModalProps & {
    /**Function to call after a successful deletion, for ex. deletion of files from disk.*/
    callback?: () => Promise<void>
} & React.PropsWithChildren){
    const {item} = useItemComponentContext();
    const {props: {tableName}} = useGalleryContext();
    const [loading, setLoading] = useState(false);
    
    const onDeleteHandler = async () => {
        setLoading(true);
        serverDeleteData(item.id, tableName)
        .then(async () => {
            toast.success('Poisto onnistui!');
            await serverRevalidatePath('');
        })
        .catch(err => console.log(toast.error(err.message)))
        .finally(() => {
            setLoading(false)
        });
    }

    const body = (
        props.children 
        || 
        <>
            <Modal.Header>Poista Kohde</Modal.Header>
            <Modal.Body>
                <span>Haluatko varmasti poistaa kohteen <strong>{item.title || item.fileName}</strong>?</span>
            </Modal.Body>
        </>
    );

    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            {body}
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