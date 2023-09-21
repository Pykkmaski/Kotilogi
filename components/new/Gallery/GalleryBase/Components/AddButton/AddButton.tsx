import Modal from "kotilogi-app/components/Modals/Modal";
import useGalleryContext from "../../GalleryContext";
import BaseAddModalBody from "../BaseAddModalBody";

type AddModalProps = {
    addModalOptions: GalleryBase.ModalOptions,
}

export default function AddButton(props: AddModalProps){
    const {state, dispatch} = useGalleryContext();

    return (
        <>
            <Modal show={state.showAddModal} onHide={() => dispatch({type: 'toggle_add_modal', value: false})} id='gallery-add-modal'>
                <Modal.Header>{props.addModalOptions.headerText}</Modal.Header>
                <Modal.Body>
                    <BaseAddModalBody additionalContent={props.addModalOptions.bodyContent}/>
                </Modal.Body>
            </Modal>
            <button className="primary add" type="button" onClick={() => dispatch({type: 'toggle_add_modal', value: true})}>Lisää Uusi</button>
        </>
    );
}