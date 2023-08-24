import axios from "axios";
import Modal from "kotilogi-app/components/Modals/Modal";
import Spinner from "kotilogi-app/components/Spinner/Spinner";
import Form from "kotilogi-app/components/Form";
import { useItemGalleryContext } from "kotilogi-app/contexts/GalleryProvider";
import { usePropertyContext } from "kotilogi-app/contexts/PropertyProvider";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventsGalleryHeader(props){
    const router = useRouter();
    const {session} = useSession();
    const [showAddModal, setShowAddModal] = useState(false);
    const {deleteItems, selectedItems, items, addItem, loading} = useItemGalleryContext();
    const {property} = usePropertyContext();

    async function addEvent(e){
        e.preventDefault();

        try{
            const newEvent = {
                name: e.target.name.value,
                description: e.target.description.value,
            }
            const res = await axios.post(`/api/user/${session.user.email}/properties/${property.id}/events`, newEvent);
            addItem(newEvent);
            router.push(`/properties/${property.id}/events/${res.data}`);
        }
        catch(err){

        }
    }

    if(loading) return <Spinner size="3rem"/>
    
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
                            <button className="secondary" type="button" disabled={loading} onClick={() => setShowAddModal(false)}>Peruuta</button>
                            <button className="primary" type="submit" disabled={loading}>Lähetä</button>
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>
            <div>
                <h1>{property.address}</h1>
                <small>Tapahtumat</small>
            </div>

            <div className="group-row">
                <button type="button" className="primary" onClick={() => deleteItems(...selectedItems)} disabled={selectedItems.length === 0}>Poista</button>
                <button type="button" className="primary add" onClick={() => setShowAddModal(true)}>Lisää Uusi</button>
            </div>
        </div>
    );
}