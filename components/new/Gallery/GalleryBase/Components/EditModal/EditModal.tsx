import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import useGalleryContext from "../../GalleryContext";

export default function EditModal(){
    const {state, dispatch, dbTableName, refId} = useGalleryContext();

    const onSubmit = async (e) => {

    }
    
    return (
        <Modal show={state.showEditModal} onHide={() => dispatch({type: 'toggle_edit_modal', value: false})}>
                <Modal.Body>
                    <Form onSubmit={}>
                        
                    </Form>
                </Modal.Body>
        </Modal>
    )
}