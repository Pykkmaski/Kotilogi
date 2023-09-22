import Modal from "kotilogi-app/components/Modals/Modal";
import BaseAddModalBody from "../BaseAddModalBody";
import useGalleryContext from "../../GalleryContext";

export default function AddModal(props: GalleryBase.ModalOptions){
    const {state, dispatch} = useGalleryContext();
    return (
        <Modal show={state.showAddModal} onHide={() => dispatch({type: 'toggle_add_modal', value: false})} id='gallery-add-modal'>
            <Modal.Header>{props.headerText}</Modal.Header>
            <Modal.Body>
                <BaseAddModalBody additionalContent={props.bodyContent}/>
            </Modal.Body>
        </Modal>
    )
}