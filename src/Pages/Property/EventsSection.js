import useEvents from '../../Hooks/useEvents';
import Gallery from '../../Components/Gallery';
import Card from '../../Components/Card';
import DeleteEvent from '../../Functions/DeleteEvent';
import AddEvent from '../../Functions/AddEvent';
import {useState, useContext} from 'react';
import LinkTo from '../../Functions/LinkTo';

import Section from '../../Components/Section';
import Button from '../../Components/Button';
import PropertyContext from '../../Contexts/PropertyContext';
import DeleteEventModal from '../../Modals/DeleteEventModal';
import NoEvents from '../../Components/Error/NoEvents';

function EventsSection(props){
    const {property} = useContext(PropertyContext);
    const [events, loadEvents] = useEvents(property.id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventToBeDeleted, setEventToBeDeleted] = useState(undefined);

    function showDeleteConfirmation(id){
        setEventToBeDeleted(id);
        setShowDeleteModal(true);
    }

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Tapahtumat</h1>
                </div>

                <div className="group-row">
                    <input type="search" placeholder="Etsi Tapahtumaa..." onChange={() => loadEvents(e.target.value)}/>
                    <Button title="Lisää Tapahtuma" variant="add" className="primary" onClick={() => AddEvent(null, property.id, (id) => location.assign(`/#/properties/${property.id}/events/${id}/info`))}/>
                </div>

                <DeleteEventModal
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    eventToBeDeleted={eventToBeDeleted}
                    deleteFunction={() => {
                        DeleteEvent(eventToBeDeleted, () => loadEvents());
                        setShowDeleteModal(false);
                    }}
                />
                
            </Section.Header>

            <Section.Body>
                <Gallery buttonTitle="Lisää Tapahtuma" >
                    <Gallery.Body>
                    {
                        events.length ?
                        events.map(ev => {
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
                                            <button className="primary" onClick={() => LinkTo(`/properties/${property.id}/events/${ev.id}/info`)}>Avaa</button>
                                            <button className="black" onClick={() => showDeleteConfirmation(ev.id)}>Poista</button>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            )
                        })
                        :
                        <NoEvents/>
                    }
                    </Gallery.Body>
                    
                </Gallery>

                
                
            </Section.Body>
        </Section>
    );
}

export default EventsSection;