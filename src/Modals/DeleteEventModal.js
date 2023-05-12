import Modal from '../Components/Modal';

function DeleteEventModal(props){
    return (
        <Modal key={props.key} show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>
                <Modal.Title>Poista Tapahtuma</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Oletko varma että haluat poistaa tämän tapahtuman? Toimintoa ei voi kumota!
            </Modal.Body>

            <Modal.Footer>
                <button style={{width: "100px"}} className="primary" onClick={() => props.setShowModal(false)}>Ei</button>
                <button style={{width: "100px"}}className="secondary" onClick={() => props.deleteFunction(props.eventToBeDeleted)}>Kyllä</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteEventModal;