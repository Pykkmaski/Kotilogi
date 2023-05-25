import useEvents from '../../Hooks/useEvents';
import Gallery from '../../Components/Gallery';
import EventCard from '../../Components/Cards/EventCard';

import Delete from '../../Functions/Delete';
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
    const [editing, setEditing] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);
    
    function showDeleteConfirmation(id){
        setEventToBeDeleted(id);
        setShowDeleteModal(true);
    }

    function editFunction(){
        setEditing(true);
        console.log('Editing events...')
    }

    function cancelEditFunction(){
        setEditing(false);
    }

    return (
        <Section data-testid="events-section">
            <Section.Header data-testid="events-section-header">
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Tapahtumat</h1>
                </div>

                <div className="group-row">
                    <EditButton
                        editFunction={editFunction}
                        cancelFunction={cancelEditFunction}
                    
                    >Muokkaa</EditButton>
                    <Button variant="add" className="primary" onClick={() => AddEvent(null, property.id, (id) => {
                        location.assign(`/#/properties/${property.id}/events/${id}/info`);
                        console.log('At callback assigning location...');
                    })}>Uusi Tapahtuma</Button>
                </div>
                
                <DeleteEventModal
                    data-testid="events-delete-modal"
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}
                    eventToBeDeleted={eventToBeDeleted}
                    deleteFunction={() => {
                        Delete(`/api/events/${eventToBeDeleted}`, () => loadEvents());
                        setShowDeleteModal(false);
                    }}
                />
                
            </Section.Header>

            <Section.Body data-testid="events-section-body">
                <Gallery buttonTitle="Lisää Tapahtuma" >
                    <Gallery.Body>
                    {
                        events.length ?
                        events.map(ev => {
                            const url = `/#/properties/${ev.property_id}/events/${ev.id}/info`;
                            const eventCard = <EventCard event={ev} editing={editing} functions={{
                                deleteEvent: (id) => showDeleteConfirmation(id)
                            }}/>

                            return (
                                !editing ? 
                                <a className="container-link" href={url}>
                                    {eventCard}
                                </a> 
                                :
                                eventCard
                                
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