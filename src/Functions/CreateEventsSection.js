import useEvents from '../Hooks/useEvents';
import LoadingSpinner from '../Components/Spinner';
import Gallery from '../Components/Gallery';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DeleteEvent from './DeleteEvent';
import AddEvent from './AddEvent';
import AppModal from '../Modals/AppModal';
import {useState} from 'react';
import LinkTo from './LinkTo';

function CreateEventsSection(property_id){
    const [events, loadEvents] = useEvents(property_id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(undefined);

    function showDeleteConfirmation(id){
        setEventToBeDeleted(id);
        setShowDeleteModal(true);
    }

    if(!events) return <LoadingSpinner/>
    
    return (
        <Gallery 
            title="Tapahtumat" 
            secondaryTitle="Lisää Tapahtuma" 
            onClickHandler={() => AddEvent(null, property_id, (event_id) => LinkTo(`/events/${event_id}`))}
        >
            {
                events.map(ev => {
                    return (
                        <Card className="event-card" key={`event-card-${ev.id}`}>
                            <Card.Img src={`/images/property/${ev.property_id}/events/${ev.id}/main`} variant="top"></Card.Img>
                            <Card.Body>
                            <Card.Title className="text-ellipsis">{ev.name}</Card.Title>
                            <Card.Text className="event-card-text">{ev.description}</Card.Text>

                            <div className="card-button-group">
                                <Button variant="secondary" className="w-100" onClick={() => showDeleteConfirmation(ev.id)}>Poista</Button>
                                <Button variant="primary" className="w-100" onClick={() => LinkTo(`/events/${ev.id}`)}>Avaa</Button>
                            </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }

            <AppModal variant="delete/event" setShowModal={setShowDeleteModal} showModal={showDeleteModal} deleteFunction={() => DeleteEvent(eventToBeDeleted, () => {setShowDeleteModal(false); loadEvents()})} eventToBeDeleted={eventToBeDeleted}/> 
            <AppModal variant="upload/event" setShowModal={setShowAddEventModal} showModal={showAddEventModal}/>
            
        </Gallery>
    )
}

export default CreateEventsSection;