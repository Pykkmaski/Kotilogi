"use client";

import axios from "axios";
import Modal from "kotilogi-app/components/Modals/Modal";
import Form from "kotilogi-app/components/Form";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import { useState } from "react";
import { useGallery } from "kotilogi-app/contexts/GalleryProvider";
import { Button, Header } from "kotilogi-app/components/Gallery/Gallery";

export default function EventsGalleryHeader({events}: {events: any[]}){

    const {selectedItems} = useGallery();
    const [showAddModal, setShowAddModal] = useState(false);
    const {property} = usePropertyProvider();

    async function addEvent(e){
        e.preventDefault();
    }

    const buttons: Button[] = [
        {
            type: 'add',
            action: () => setShowAddModal(true),
        },

        {
            type: 'delete',
            action: () => console.log('Deleting event')
        }
    ]

    return (
        <>
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header>Lisää Tapahtuma</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addEvent}>
                        <Form.Group>
                            <label>Tapahtuman Nimi</label>
                            <input name="name" required></input>
                        </Form.Group>

                        <Form.Group>
                            <label>Tapahtuman Kuvaus</label>
                            <textarea name="name" spellCheck={false}></textarea>
                            <Form.SubLabel>Anna vaihtoehtoinen kuvaus.</Form.SubLabel>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <button className="secondary" type="button" onClick={() => setShowAddModal(false)}>Peruuta</button>
                            <button className="primary" type="submit">Lähetä</button>
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>

            <Header 
                title={property.address}
                subtitle="Tapahtumat"
                content={events}
                buttons={buttons}
            />
        </>
    );
}