import useEvents from '../Hooks/useEvents';
import LoadingSpinner from './Spinner';
import Gallery from './Gallery';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DeleteEvent from '../Functions/DeleteEvent';
import AddEvent from '../Functions/AddEvent';
import AppModal from '../Modals/AppModal';
import {useState} from 'react';
import LinkTo from '../Functions/LinkTo';

function PropertyEventsSection({property_id}){
    const [events, loadEvents] = useEvents(property_id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(undefined);

    function showDeleteConfirmation(id){
        setEventToBeDeleted(id);
        setShowDeleteModal(true);
    }

    return (
        <Gallery 
            title="Tapahtumat" 
            secondaryTitle="Lisää Tapahtuma" 
            onClickHandler={() => AddEvent(null, property_id, (event_id) => LinkTo(`/properties/${property_id}/events/${event_id}`))}
        >
            {
                events.map(ev => {
                    const eventMainImage = `/properties/${ev.property_id}/events/${ev.id}/images/main`;
                    return (
                        <Card className="event-card" key={`event-card-${ev.id}`}>
                            <Card.Img 
                                src={eventMainImage} 
                                variant="top" 
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = './img/no-pictures.png';
                                }}></Card.Img>
                            <Card.Body>
                            <Card.Title className="text-ellipsis">{ev.name}</Card.Title>
                            <Card.Text className="event-card-text">{ev.description}</Card.Text>

                            <div className="card-button-group">
                                <Button variant="secondary" className="w-100" onClick={() => showDeleteConfirmation(ev.id)}>Poista</Button>
                                <Button variant="primary" className="w-100" onClick={() => LinkTo(`/properties/${property_id}/events/${ev.id}`)}>Avaa</Button>
                            </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }

            <AppModal 
                variant="delete/event" 
                setShowModal={setShowDeleteModal} 
                showModal={showDeleteModal} 
                deleteFunction={() => 
                    DeleteEvent(property_id, eventToBeDeleted, () => {
                        setShowDeleteModal(false); 
                        loadEvents()})} 
                eventToBeDeleted={eventToBeDeleted}/> 

            <AppModal 
                variant="upload/event" 
                setShowModal={setShowAddEventModal} 
                showModal={showAddEventModal}/>
            
        </Gallery>
    )
}

export default PropertyEventsSection;