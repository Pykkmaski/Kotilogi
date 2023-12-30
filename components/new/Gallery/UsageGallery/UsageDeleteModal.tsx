import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import ItemDeleteModal from "../Modals/ItemDeleteModal";
import { useItemComponentContext } from "../GalleryBase/Components/Body/Components/ItemComponent/ItemComponent";

export default function UsageDeleteModal(props: ModalProps){

    const {item} = useItemComponentContext();

    return (
        <ItemDeleteModal {...props}>
            <Modal.Header>Poista kulutustieto</Modal.Header>
            <Modal.Body>
                <p>
                    Olet poistamassa seuraavaa kulutustietoa:<br/><br/>
                    Hinta:      <strong>{item.price}€</strong><br/>
                    Päivämäärä: <strong>{new Date(item.time).toLocaleDateString('fi-FI')}</strong><br/><br/>
                    Oletko varma?
                </p>
            </Modal.Body>
        </ItemDeleteModal>
    );
}