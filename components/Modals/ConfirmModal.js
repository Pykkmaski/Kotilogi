import Modal from './Modal';

function ConfirmModal(props){
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)}>
            <Modal.Header>{props.title}</Modal.Header>
            <Modal.Body>
                {props.text}
            </Modal.Body>
            <Modal.Footer>
                <div className="group-row">
                    <button className="primary" onClick={() => props.onCancel()}>Ei</button>
                    <button className="secondary" onClick={() => props.onConfirm()}>Kyllä</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;