import Form from "../Form";
import Modal from './Modal';

function UploadEnergyUsageModal(props){
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>Luo Kulutustieto</Modal.Header>
            <Modal.Body>
                <Form onSubmit={props.submitFunction}>
                    <Form.Group>
                        <Form.Label>Päivämäärä</Form.Label>
                        <Form.Control type="date" name="date"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Wattimäärä</Form.Label>
                        <Form.Control type="number" name="watt_amount"></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Euromäärä</Form.Label>
                        <Form.Control type="number" name="price"></Form.Control>
                    </Form.Group>

                    <Form.ButtonGroup>
                        <button type="button" className="secondary" onClick={() => setShowModal(false)}>Peruuta</button>
                        <button type="submit" className="primary">Lähetä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UploadEnergyUsageModal;