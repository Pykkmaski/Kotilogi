import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AppModal from '../Modals/AppModal';
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
        <div className="d-flex flex-column px-5 align-items-center">
            <header className="d-flex flex-row gap-1">
                <img id="property-main-image" src={`/property/images/${id}/main`}></img>

                <div id="property-information-area">
                    <h1>{property.address}</h1>
                    <p>
                        Talon kuvaus.
                    </p>
                </div>
            </header>
            
            <div className="d-flex flex-column">
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
                                    <Card.Title className="text-ellipsis">{ev.name}</Card.Title>
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

           
            <AppModal variant="delete/event" setShowModal={setShowDeleteModal} showModal={showDeleteModal} deleteFunction={deleteEvent} eventToBeDeleted={eventToBeDeleted}/> 
            <AppModal variant="upload/event" setShowModal={setShowAddEventModal} showModal={showAddEventModal} uploadFunction={addNewEvent}/>

        </div>
    )
}

export default Property;