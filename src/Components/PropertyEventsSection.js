import useEvents from '../Hooks/useEvents';
import Gallery from './Gallery';
import Card from '../Components/Card';
import DeleteEvent from '../Functions/DeleteEvent';
import AddEvent from '../Functions/AddEvent';
import AppModal from '../Modals/AppModal';
import {useState, useContext} from 'react';
import LinkTo from '../Functions/LinkTo';
import PropertyEventsContext from '../Contexts/PropertyEventsContext';
import Section from './Section';
import Button from './Button';
import AddProperty from '../Functions/AddProperty';

function Header(props){
    return (
        <Section.Header>
            <h1>Tapahtumat</h1>
            <div className="group-row">
                <input type="search" defaultValue="Etsi Tapahtumaa..." onChange={() => props.loadEvents(e.target.value)}/>
                
            </div>
           
        </Section.Header>
    )
}

function Events(props){

    const {setShowDeleteModal, setEventToBeDeleted, property_id} = useContext(PropertyEventsContext);
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
                            <Card.Title>{ev.name}</Card.Title>
                            <div className="card-text">
                                <span>{ev.description}</span>
                            </div>
                        </Card.Body>

                        <Card.Footer>
                            <div className="card-button-group">
                                <button className="primary" onClick={() => LinkTo(`/properties/${property_id}/events/${ev.id}/info`)}>Avaa</button>
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

function PropertyEventsSection({property_id}){
    const [events, loadEvents] = useEvents(property_id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(undefined);

    return (
        
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
                <Section>
                    <Section.Header>
                        <h1>Tapahtumat</h1>
                        <div className="group-row">
                            <input type="search" placeholder="Etsi Tapahtumaa..." onChange={() => props.loadEvents(e.target.value)}/>
                            <Button title="Lisää Tapahtuma" variant="add" className="primary" onClick={() => AddEvent(null, property_id, (id) => location.assign(`/#/properties/${property_id}/events/${id}/info`))}/>
                        </div>
                        
                    </Section.Header>

                    <Section.Body>
                        <Gallery buttonTitle="Lisää Tapahtuma" >
                            <Gallery.Body>
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
                    </Section.Body>
                </Section>

            </PropertyEventsContext.Provider>
    );
}

export default PropertyEventsSection;