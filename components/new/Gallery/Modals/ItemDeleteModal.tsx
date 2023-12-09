import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useCardContext } from "../GalleryBase/Components/Body/Components/Card/CardContext";
import Button from "kotilogi-app/components/Button/Button";

export default function ItemDeleteModal(props: ModalProps & {deleteHandler: () => Promise<void>}){
    const {props: {item}} = useCardContext();
    
    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            <Modal.Header>Poista Kohde</Modal.Header>
            <Modal.Body>
                Olet poistamassa kohdetta {item.title}.<br/>
                Oletko varma?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="secondary"
                    desktopText="Ei"
                    onClick={props.onHide}
                />

                <Button
                    className="primary"
                    desktopText="Kyllä"
                    onClick={props.deleteHandler}
                />
            </Modal.Footer>
        </Modal>
    )
}