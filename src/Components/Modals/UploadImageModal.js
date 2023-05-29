import Modal from './Modal';
import Form from '../Form';

function UploadImageModal(props){
    return (
        <Modal key={props.key} show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>
                Lataa Kuva
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={props.uploadFunction}>
                    <Form.Group>
                        <Form.Label>Tiedoston otsikko (Ei muuta tiedoston nimeä)</Form.Label>
                        <Form.Control name="title" placeholder="Tiedoston otsikko"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tiedoston kuvaus</Form.Label>
                        <Form.Control name="description" type="textarea"></Form.Control>
                    </Form.Group>

                    <Form.Group className="w-100">
                        <Form.Control type="file" accept="image/jpeg" name="image"></Form.Control>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <button className="secondary" type="button" onClick={() => props.setShowModal(false)}>Peruuta</button>
                        <button className="primary" type="submit" name="submit_button">Lähetä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UploadImageModal;