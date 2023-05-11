import Modal from '../Components/Modal';
import Form from '../Components/Form';

function UploadImageModal(props){
    return (
        <Modal key={props.key} show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>
                Lataa Kuva
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={props.uploadFunction}>
                    <Form.Group className="w-100">
                        <Form.Control type="file" accept="image/jpeg" name="image"></Form.Control>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <button className="secondary" type="button" onClick={() => props.setShowModal(false)}>Peruuta</button>
                        <button className="primary" type="submit">Lähetä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UploadImageModal;