import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { useParams } from 'react-router-dom';
import 'bootstrap/scss/bootstrap.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AppModal from '../Modals/AppModal';
import EditableField from '../Components/EditableField';
import useProperty from '../Hooks/useProperty';
import useEvents from '../Hooks/useEvents';
import DeleteEvent from '../Functions/DeleteEvent';
import AddEvent from '../Functions/AddEvent';

const plusIcon = './img/plus.png';

function Property(props){

    const {id} = useParams();
    const [property, loadProperty] = useProperty(id);
    const [events, loadEvents] = useEvents(id);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(undefined);

    function linkToEvent(route){
        location.assign('/#' + route);
    }

    function showDeleteConfirmation(id){
        setEventToBeDeleted(id);
        setShowDeleteModal(true);
    }

    function addNewEvent(e){
        e.preventDefault();

        axios.post(`/property/${id}/events/`, {
            name: e.target.name.value,
            description: e.target.description.value ,
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

    function addUnnamedEvent(){
        const event = {
            property_id: property.id,
            description: `Nimetön`,
            name: `Nimetön tapahtuma ${events.length + 1}`,
            date: new Date().toLocaleDateString(),
        }

        axios.post(`/property/${property.id}/events/`, event).then(res => {
            loadEvents();
            const lastEventID = events[events.length - 1].id;
            location.assign(`/#/property/${property.id}/events/${lastEventID}`);
        })
        .catch(err => console.log(err.message));
    }

    if(!property || !events) return <Loading message="Ladataan taloa..."/>

    return (
        <div className="d-flex flex-column align-items-center"> 
            <header className="d-flex flex-row gap-5 w-100 bg-darkgray py-5 justify-content-center  mb-3">
                <img id="property-main-image" src={`/property/images/${id}/main`}></img>

                <div>
                    <h1 className="text-white">{property.address}</h1>
                    <p className="text-white">
                        Tämmönen taloohan tää o.<br/>
                        Eipä tässä sen kummempia. Vähä tekstiä tähän <br/>
                        Että näyttää siltä niinku olis sisältöä.
                    </p>
                </div>
            </header>
            
            <div className="d-flex flex-column">
                <header id="events-area-header">
                    <h1>Tapahtumat</h1>
                </header>

                <div id="events-area-body">
                    <div className="new-event-card" onClick={() => addUnnamedEvent()}>
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

           
            <AppModal variant="delete/event" setShowModal={setShowDeleteModal} showModal={showDeleteModal} deleteFunction={() => DeleteEvent(eventToBeDeleted, () => {setShowDeleteModal(false); location.reload()})} eventToBeDeleted={eventToBeDeleted}/> 
            <AppModal variant="upload/event" setShowModal={setShowAddEventModal} showModal={showAddEventModal} uploadFunction={addNewEvent}/>

        </div>
    )
}

export default Property;