import Image from '../Image';
import Modal from './Modal';

function ShowImageModal(props){
    return (
        <Modal key={props.key} onHide={() => props.setShowModal(false)} show={props.showModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Image className="big-image" src={props.imageUrl}/>
            </Modal.Body>
            <Modal.Footer>
                <button className="primary" onClick={props.setImageAsMain}>Aseta Pääkuvaksi</button>
                <button className="secondary" onClick={() => props.setShowModal(false)}>Sulje</button>
                <button className="danger" onClick={() => props.deleteSelectedImage()}>Poista</button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowImageModal;