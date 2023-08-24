import { useItemGalleryContext } from "kotilogi-app/contexts/GalleryProvider";
import axios from 'axios';
import Spinner from 'kotilogi-app/components/Spinner/Spinner';
import { useSession } from "next-auth/react";
import Modal from "kotilogi-app/components/Modals/Modal";
import Form from "kotilogi-app/components/Form";
import { useState } from "react";
import styles from './component.module.scss';
import { useRouter } from "next/navigation";

export default function PropertyGalleryHeader(props){
    const router = useRouter();
    const [showAddModal, setShowAddModal] = useState(false);
    const {selectedItems, items, setItems, addItem, loading, setShowDeleteModal} = useItemGalleryContext();
    const {data: session} = useSession();

    async function addProperty(e){
        e.preventDefault();

        const newProperty = {
           address: e.target.address.value,
           description: e.target.description.value || null,
        }

        try{
            const res = await axios.post(`api/user/${session.user.email}/properties/`, newProperty);
            addItem(newProperty);
            router.push(`/properties/${res.data}/info`)
        }
        catch(err){
            console.log(err.message);
        }
    }

    if(loading) return null;
    
    return (
        <div className="gallery-header">
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header>Lisää Uusi Talo</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addProperty}>
                        <div className={styles.descriptionContainer}>
                            <p>
                                Anna talolle alustavat tiedot. <br/>
                                Tarkemmat tiedot lisätään seuraavassa vaiheessa.
                            </p>
                        </div>
                        <Form.Group>
                            <label>Osoite</label>
                            <input name="address" required></input> 
                        </Form.Group>

                        <Form.Group>
                            <label>Kuvaus</label>
                            <input name="description"></input>
                            <Form.SubLabel>Anna vaihtoehtoinen talon kuvaus.</Form.SubLabel>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <button type="button" className="secondary" disabled={loading} onClick={() => setShowAddModal(false)}>Peruuta</button>
                            <button type="submit" className="primary" disabled={loading}>Lähetä</button>
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>

            <div>
                <h1>Kiinteistöt</h1>
            </div>

            <div className="group-row">
                <button type="button" className="primary" onClick={() => setShowDeleteModal(true)} disabled={selectedItems.length === 0}>Poista</button>
                <button type="button" className="primary add" onClick={() => setShowAddModal(true)}>Lisää Uusi</button>
            </div>
        </div>
    );
}