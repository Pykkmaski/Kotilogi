import Modal from '../Components/Modal';
import Form from '../Components/Form';

function UploadFileModal(props){
    return (
        <Modal key={props.key} show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>
                Lataa PDF
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={props.uploadFunction}>
                    <Form.Group className="w-100">
                        <Form.Control type="file" accept="application/pdf" name="file"></Form.Control>
                    </Form.Group>

                    <Form.ButtonGroup className="w-100 d-flex flex-row justify-content-between gap-1">
                        <button type="button" className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                        <button className="primary" type="submit">Lähetä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UploadFileModal;