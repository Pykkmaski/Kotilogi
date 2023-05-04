import useEvents from '../Hooks/useEvents';
import LoadingSpinner from './Spinner';
import Gallery from './Gallery';
import Card from '../Components/Card';
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
                    const eventMainImage = `/api/images/events/${ev.id}/main`;

                    
                    return (
                        <Card key={`event-card-${ev.id}`}>
                            <img 
                                src={eventMainImage}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = './img/no-pictures.png';
                                }}
                            />
                            
                            <div className="body">
                                
                                <div className="title text-ellipsis">{ev.title}</div>
                                <div className="text">{ev.description}</div>
                                <div className="button-group">
                                    <button className="primary" onClick={() => LinkTo(`/properties/${property_id}/events/${ev.id}`)}>Avaa</button>
                                    <button className="danger" onClick={() => showDeleteConfirmation(ev.id)}>Poista</button>
                                </div>
                            </div>
                        </Card>
                    )
                })
            }

            <AppModal 
                variant="delete/event" 
                setShowModal={setShowDeleteModal} 
                showModal={showDeleteModal} 
                deleteFunction={() => 
                    DeleteEvent(eventToBeDeleted, () => {
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