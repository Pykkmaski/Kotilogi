import Modal from './Modal';
import Form from '../Form';

function UpdateEventModal(props){
    if(!props.event) throw new Error('UpdateEventModal: ' + 'event prop missing!');

    return(
        <Modal key={props.key} show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Muokkaa Tapahtumaa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={props.updateFunction}>
                    <Form.Group className="w-100">
                        <Form.Label>Otsikko</Form.Label>
                        <Form.Control name="name" required defaultValue={props.event.name}></Form.Control>
                    </Form.Group>

                    <Form.Group className="w-100">
                        <Form.Label>Päivämäärä</Form.Label>
                        <Form.Control name="date" type="date" required defaultValue={new Date(props.event.date)}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group className="w-100">
                        <Form.Label>Kuvaus</Form.Label>
                        <Form.Control type="textarea" name="description" defaultValue={props.event.description}></Form.Control>
                    </Form.Group>

                    <Form.ButtonGroup className="d-flex flex-row justify-content-between w-100 gap-1">
                        <button type="button" className="secondary" onClick={() => {
                            props.setShowModal(false);
                            console.log('Closing event update modal');
                        }}>Peruuta</button>
                        
                        <button type="submit" className="primary" name="submit_button">Päivitä</button>
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateEventModal;