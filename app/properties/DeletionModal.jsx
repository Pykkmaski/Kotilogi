"use client";
import { useItemGalleryContext } from "kotilogi-app/contexts/ItemGalleryContext";
import Modal from 'kotilogi-app/components/Modals/Modal';

export default function DeletionModal(){
    const {setShowDeleteModal, showDeleteModal, deleteItems, selectedItems} = useItemGalleryContext();

    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header>Poista Kiinteistöt</Modal.Header>
            <Modal.Body>Oletko varma että haluat poistaa valitsemasi kiinteistöt?</Modal.Body>
            <Modal.Footer>
                <button className="primary" onClick={() => setShowDeleteModal(false)}>Peruuta</button>
                <button className="secondary" onClick={() => deleteItems(...selectedItems)}>Poista</button>
            </Modal.Footer>
        </Modal>
    );
}