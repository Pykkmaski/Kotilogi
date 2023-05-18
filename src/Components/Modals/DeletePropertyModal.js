import Modal from "./Modal";
import Form from '../Form';

function DeletePropertyModal(props){
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>Poista Talo</Modal.Header>
            <Modal.Body>
                Oletko varma että haluat poistaa tämän talon? Toimintoa ei voi kumota!
            </Modal.Body>
            <Modal.Footer>
                <div className="group-row">
                    <button className="primary" onClick={() => props.setShowModal(false)}>Peruuta</button>
                    <button className="danger" onClick={() => props.deleteProperty()}>Poista</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default DeletePropertyModal;