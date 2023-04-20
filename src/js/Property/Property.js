import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import './Style.scss';
import 'bootstrap/scss/bootstrap.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormData from 'form-data';
const plusIcon = './img/plus.png';

function Property(props){

    const [property, setProperty] = useState(null);
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(undefined);
    const {id} = useParams();

    function loadEvents(){
        setLoading(true);

        axios.get(`/property/${id}`).then(res => {
            setProperty(res.data);
        })
        .catch(err => {
            console.log(err.response.status);
        })
        .finally(() => setLoading(false));

        axios.get(`/property/${id}/events`).then(res => {
            setEvents(res.data);
        })
        .catch(err => {
            console.log(err.response.status);
        })
        .finally(() => setLoading(false));
    }

    function linkToEvent(route){
        location.assign('/#' + route);
    }

    function deleteEvent(event_id){
        axios.delete(`/property/${id}/events/${event_id}`).then(res => {
            setShowDeleteModal(false);
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    }

    function showDeleteConfirmation(id){
        setEventToBeDeleted(id);
        setShowDeleteModal(true);
    }

    function addNewEvent(e){
        e.preventDefault();

        axios.post(`/property/${id}/events/`, {
            name: e.target.name.value,
            description: e.target.description.value,
            date: e.target.date.value,
            property_id: id,

        })
        .then(res => {
            loadEvents();
        })
        .catch(err => {
            console.log(err.response.status);
        })
        .finally(() => {
            setShowAddEventModal(false);
        });
    }

    useEffect(() => {   
        loadEvents();
    }, []);

    if(loading) return <Loading message="Ladataan taloa..."/>

    return (
        <div id="property-page">
            <header id="property-page-header">
                <img id="property-main-image" src={`/property/images/${id}/main`}></img>

                <div id="property-information-area">
                    <h1>{property.address}</h1>
                    <p>
                        Talon kuvaus.
                    </p>
                </div>
            </header>

            <div id="events-area">
                <header id="events-area-header">
                    <h1>Tapahtumat</h1>
                </header>

                <div id="events-area-body">
                    <div className="new-event-card" onClick={() => setShowAddEventModal(true)}>
                        <div className="icon-container">
                            <img src={plusIcon}/>
                        </div>
                        
                        <span>Lisää Uusi Tapahtuma</span>
                    </div>
                    {
                        events.map(ev => {
                            return (
                                <Card className="event-card">
                                    <Card.Img src={`/images/property/${ev.property_id}/events/${ev.id}/main`} variant="top"></Card.Img>
                                    <Card.Body>
                                    <Card.Title>{ev.name}</Card.Title>
                                    <Card.Text className="event-card-text">{ev.description}</Card.Text>

                                    <div className="card-button-group">
                                        <Button variant="secondary" className="w-100" onClick={() => showDeleteConfirmation(ev.id)}>Poista</Button>
                                        <Button variant="primary" className="w-100" onClick={() => linkToEvent(`/property/${id}/events/${ev.id}`)}>Avaa</Button>
                                    </div>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>

            <div id="images-area">
                <div id="new-image-card">
                    <div className="icon-container">
                        <img src={plusIcon}></img>
                        <span>Lisää Kuva</span>
                    </div>
                </div>
            </div>

            <div id="pdf-area">
                <div id="new-pdf-card">
                    <div className="icon-container">
                        <img src={plusIcon}></img>
                        <span>Lisää PDF</span>
                    </div>
                </div>

            </div>

            <Modal show={showDeleteModal} backdrop="static" centered onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Poista Tapahtuma</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Oletko varma että haluat poistaa tämän tapahtuman?
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{width: "100px"}} variant="primary" onClick={() => setShowDeleteModal(false)}>Ei</Button>
                    <Button style={{width: "100px"}}variant="secondary" onClick={() => deleteEvent(eventToBeDeleted)}>Kyllä</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddEventModal} backdrop="static" centered onHide={() => setShowAddEventModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Lisää Tapahtuma</Modal.Title>
                    
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={addNewEvent}>
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

                        <Form.Group className="d-flex flex-row justify-content-between w-100">
                            <Button variant="secondary" onClick={() => setShowAddEventModal(false)}>Peruuta</Button>
                            <Button type="submit" variant="primary">Lisää</Button>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

export default Property;