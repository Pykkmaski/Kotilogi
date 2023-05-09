import useEvents from '../Hooks/useEvents';
import LoadingSpinner from './Spinner';
import Gallery from './Gallery';
import Card from '../Components/Card';
import Button from 'react-bootstrap/Button';
import DeleteEvent from '../Functions/DeleteEvent';
import AddEvent from '../Functions/AddEvent';
import AppModal from '../Modals/AppModal';
import {useState, useContext} from 'react';
import LinkTo from '../Functions/LinkTo';
import PropertyEventsContext from '../Contexts/PropertyEventsContext';

function Header(props){
    return (
        <div className="property-events-header">
            <h1>Tapahtumat</h1>
            <input type="search" defaultValue="Etsi Tapahtumaa..." onChange={() => props.loadEvents(e.target.value)}/>
        </div>
    )
}

function Events(props){

    const {setShowDeleteModal, setEventToBeDeleted} = useContext(PropertyEventsContext);
    function showDeleteConfirmation(id){
        setShowDeleteModal(true);
        setEventToBeDeleted(id);
    }

    return (
        <>
         {
            props.events.map(ev => {
                const eventMainImage = `/api/images/events/${ev.id}/main`;

                return (
                    <Card key={`event-card-${ev.id}`}>

                        <Card.Image 
                            src={eventMainImage}
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = './img/no-pictures.png';
                            }}
                        />
                        
                        <Card.Body>
                            <div className="card-title text-ellipsis">{ev.name}</div>
                            <div className="card-text">
                                <span>{ev.description}</span>
                            </div>
                        </Card.Body>

                        <Card.Footer>
                            <div className="card-button-group">
                                <button className="primary" onClick={() => LinkTo(`/properties/${property_id}/events/${ev.id}`)}>Avaa</button>
                                <button className="black" onClick={() => showDeleteConfirmation(ev.id)}>Poista</button>
                            </div>
                        </Card.Footer>
                    </Card>
                )
            })
        }
        </>
       
    )
}

function Body(props){
    const {
        property_id, 
        events, 
        loadEvents,
        showDeleteModal, 
        setShowDeleteModal, 
        eventToBeDeleted, 
        setShowAddEventModal, 
        showAddEventModal} = useContext(PropertyEventsContext);
    
    function galleryAddHandler(){
        AddEvent(null, property_id, (event_id) => LinkTo(`/properties/${property_id}/events/${event_id}`));
    }

    return (
        <div className="property-events-body">
            <Gallery buttonTitle="Lisää Tapahtuma" >
                <Gallery.Body>
                    <Gallery.Button title="Lisää Tapahtuma" onClickHandler={() => galleryAddHandler()}></Gallery.Button>
                    <Events events={events}/>
                </Gallery.Body>
                
            </Gallery>

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
        </div>
        
    )
}

function PropertyEventsSection({property_id}){
    const [events, loadEvents] = useEvents(property_id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(undefined);

    return (
        <div className="property-events-section">
            <PropertyEventsContext.Provider
                value={
                    {
                        property_id,
                        events,
                        showDeleteModal,
                        showAddEventModal,
                        eventToBeDeleted,

                        setShowDeleteModal,
                        setShowAddEventModal,
                        setEventToBeDeleted,
                        loadEvents,
                    }
                }
            >
                <Header/>
                <Body/>
            </PropertyEventsContext.Provider>
        </div>
    );
}

export default PropertyEventsSection;