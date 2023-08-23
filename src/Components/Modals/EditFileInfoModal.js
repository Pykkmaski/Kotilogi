import Form from '../Form';
import Modal from './Modal';

function EditFileInfoModal(props){
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>Muokkaa Tiedostoa</Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.onSubmit}>
                    <Form.Group>
                        <Form.Label>Otsikko</Form.Label>
                        <Form.Control name="title"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Kuvaus</Form.Label>
                        <Form.Control name="description" type="textarea"></Form.Control>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <button className="secondary" type="button" onClick={() => props.setShowModal(false)}>Peruuta</button>
                        <button className="primary" type="submit">Päivitä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditFileInfoModal;