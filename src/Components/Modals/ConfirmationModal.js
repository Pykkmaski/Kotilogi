import Modal from './Modal';

function ConfirmModal(props){
    return (
        <Modal show={props.showModal} onHide={() => propssetShowModal(false)}>
            <Modal.Header>{props.title}</Modal.Header>
            <Modal.Body>
                {props.text}
            </Modal.Body>
            <Modal.Footer>
                <div className="group-row">
                    <button className="primary">Ei</button>
                    <button className="secondary">Kyllä</button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;