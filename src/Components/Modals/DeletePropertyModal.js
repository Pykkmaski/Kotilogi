import Modal from "./Modal";
import Form from '../Form';

function DeletePropertyModal(props){
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>Poista Talo</Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.submitFunction}>
                    <Form.Group>
                        <Form.Label>Anna Salasanasi</Form.Label>
                        <Form.Control type="password" name="password"></Form.Control>
                    </Form.Group>
                    <Form.ButtonGroup>
                        <button type="button" className="primary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                        <button type="submit" className="danger">Poista</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default DeletePropertyModal;