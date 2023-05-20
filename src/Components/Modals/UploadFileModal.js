import Modal from './Modal';
import Form from '../Form';
import Button from '../Buttons/Button';

function UploadFileModal(props){
    return (
        <Modal key={props.key} show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>
                Lataa PDF
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={props.uploadFunction}>
                    <Form.Group>
                        <Form.Label>Tiedoston Otsikko</Form.Label>
                        <Form.Control name="title" placeholder="Tiedostonimen tilalla näytettävä otsikko"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tiedoston Kuvaus</Form.Label>
                        <Form.Control name="description"></Form.Control>
                    </Form.Group>

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