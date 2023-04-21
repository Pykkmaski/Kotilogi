import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import 'bootstrap/scss/bootstrap.scss';
import ImageContainer from '../Components/ImageContainer';
import Button from 'react-bootstrap/Button';
import Modal from '../Modals/AppModal';
import Form from 'react-bootstrap/Form';

function Event(propes){
    const {event_id, property_id} = useParams();
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [showEditEventModal, setShowEditEventModal] = useState(false);

    function loadEvent(){
        setLoading(true);

        axios.get(`/property/${property_id}/events/${event_id}`).then(res => {
           setEvent(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    function updateEvent(){
        
    }
    useEffect(() => {
        loadEvent();
     }, []);

    if(loading) return <Loading message="Ladataan tapahtumaa..."/>

    return (
        <div className="d-flex flex-column px-5 align-items-center">
            <div className="d-flex flex-row">
                <a href={`/#/property/${property_id}`}>Takaisin Taloon</a>
            </div>

            <header className="d-flex flex-row align-items-center">
                <img id="event-main-image" src={`/images/property/${event.property_id}/events/${event.id}/main`}/>
                <div id="event-page-header-body">
                    <h1>{event.name}</h1>
                    <p>
                        {
                            event.description
                        }
                    </p>
                </div>
                <div id="event-header-controls">
                    <Button type="primary">Muokkaa</Button>
                </div>
            </header>
            
            <div id="event-page-sections-container">
                <ImageContainer loadEvent/>
            </div>

            <Modal show={showEditEventModal} backdrop="static" centered onHide={() => setShowEditEventModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Lisää Tapahtuma</Modal.Title>
                    
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={updateEvent}>
                        <Form.Group className="w-100">
                            <Form.Label>Otsikko</Form.Label>
                            <Form.Control name="name" required></Form.Control>
                        </Form.Group>

                        <Form.Group className="w-100">
                            <Form.Label>Päivämäärä</Form.Label>
                            <Form.Control name="date" type="date" required></Form.Control>
                        </Form.Group>
                        
                        <Form.Group className="w-100">
                            <Form.Label>Kuvaus</Form.Label>
                            <Form.Control as="textarea" name="description"></Form.Control>
                        </Form.Group>

                        <Form.Group className="d-flex flex-row justify-content-between w-100 gap-1">
                            <Button variant="secondary" onClick={() => setShowEditEventModal(false)}>Peruuta</Button>
                            <Button type="submit" variant="primary">Lisää</Button>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

export default Event;