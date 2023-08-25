"use client";

import axios from "axios";
import Modal from "kotilogi-app/components/Modals/Modal";
import Form from "kotilogi-app/components/Form";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import { useState } from "react";
export default function EventsGalleryHeader(props){

    const [showAddModal, setShowAddModal] = useState(false);
    const {property} = usePropertyProvider();

    async function addEvent(e){
        e.preventDefault();
    }

    return (
        <div className="gallery-header">

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
                            <textarea name="name"></textarea>
                            <Form.SubLabel>Anna vaihtoehtoinen kuvaus.</Form.SubLabel>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <button className="secondary" type="button" onClick={() => setShowAddModal(false)}>Peruuta</button>
                            <button className="primary" type="submit">Lähetä</button>
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>
            <div>
                <h1>{property.address}</h1>
                <small>Tapahtumat</small>
            </div>

            <div className="group-row">
                <button type="button" className="primary" onClick={undefined}>Poista</button>
                <button type="button" className="primary add" onClick={() => setShowAddModal(true)}>Lisää Uusi</button>
            </div>
        </div>
    );
}