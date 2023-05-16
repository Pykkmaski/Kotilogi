import useEvents from '../../Hooks/useEvents';
import Gallery from '../../Components/Gallery';
import EventCard from '../../Components/Cards/EventCard';

import DeleteEvent from '../../Functions/DeleteEvent';
import AddEvent from '../../Functions/AddEvent';
import {useState, useContext} from 'react';

import Section from '../../Components/Section';
import Button from '../../Components/Buttons/Button';
import EditButton from '../../Components/Buttons/EditButton';
import PropertyContext from '../../Contexts/PropertyContext';
import DeleteEventModal from '../../Components/Modals/DeleteEventModal';
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

    function editFunction(){

    }

    function cancelEditFunction(){

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
                    <EditButton
                        editFunction={editFunction}
                        cancelFunction={cancelEditFunction}
                    
                    >Muokkaa</EditButton>
                    <Button variant="add" className="primary" onClick={() => AddEvent(null, property.id, (id) => location.assign(`/#/properties/${property.id}/events/${id}/info`))}>Uusi Tapahtuma</Button>
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
                            const url = `/#/properties/${ev.property_id}/events/${ev.id}/info`;
                            return (
                                <a className="container-link" href={url}>
                                    <EventCard event={ev}/>
                                </a> 
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