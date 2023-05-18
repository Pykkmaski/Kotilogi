import Form from "../Form";
import Modal from './Modal';

function UploadUsageModal(props){
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>Luo Kulutustieto</Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.submitHandler}>

                    <Form.Group>
                        <Form.Label>Tyyppi</Form.Label>
                        <select>
                            <option value="water" selected={true}>Vesi</option>
                            <option value="electricity">Sähkö</option>
                            <option value="heating">Lämpö</option>
                        </select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Päivämäärä</Form.Label>
                        <Form.Control type="date" name="date"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Euromäärä</Form.Label>
                        <Form.Control type="number" name="price"></Form.Control>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <button type="button" className="secondary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                        <button type="submit" className="primary">Lähetä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UploadUsageModal;