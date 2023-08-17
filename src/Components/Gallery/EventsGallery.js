import {useContext, useState} from 'react';
import EventsGalleryContext from "../../Contexts/EventsGalleryContext";
import Button from "../Buttons/Button";
import { EventCard } from "../Cards/EventCard.new";
import NoEvents from "../Error/NoEvents";
import Gallery from './Gallery';
import Delete from '../../Functions/Delete';
import AddEvent from '../../Functions/AddEvent';
import useEvents from '../../Hooks/useEvents';
import { Redirect, useNavigate } from 'react-router-dom';
import Modal from '../Modals/Modal';

export function EventsGallery({property}){
    const navigate = useNavigate();
    const [events, loadEvents] = useEvents(property.id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    //const [displayProperties, setDisplayProperties] = useState([]); //These change depending on what is typed in the search bar.
    const [selectedEvents, setSelectedEvents] = useState([]);

    if(!events) return <Loading message="Ladataan Tapahtumia..."/>
    //setDisplayProperties(properties);

    function selectAll(e){
        const checked = e.target.checked;

        if(checked){
            const newSelected = events.map(item => item.id);
            console.log(newSelected);
            setSelectedEvents(newSelected);
        }
        else{
            setSelectedEvents([]);
        }
        
    }

    function deleteEvents(){
        for(const id of arguments){
            console.log('Deleting event ' + id)
            Delete('/api/events/' + id, () => null);
        }

        loadEvents();
        setSelectedEvents([]);
        setShowDeleteModal(false);
    }

    function selectEvent(id){
        const currentSelectedEvents = [...selectedEvents];

        const eventIsSelected = currentSelectedEvents.find(item => item === id);

        if(eventIsSelected) {
            const indexOfSelectedId = currentSelectedEvents.indexOf(id);
            currentSelectedEvents.splice(indexOfSelectedId, 1);
        }
        else{
            currentSelectedEvents.push(id);
        }

        setSelectedEvents(currentSelectedEvents);
    }

    function addEvent(){
        const newEvent = {
            property_id: property.id,
            name: 'Nimetön Tapahtuma',
        }

        AddEvent(newEvent, property.id, (newEventId) => {
            navigate(`/properties/${property.id}/events/${newEventId}`);
        });
    }
    const contextValue = {
        deleteEvents,
        selectEvent,
        selectedEvents,
    }

    return (
            <Gallery id="events-gallery">
                <EventsGalleryContext.Provider value={contextValue}>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header>Poista Tapahtumia</Modal.Header>
                    <Modal.Body>Oletko varma että haluat poistaa valitsemasi tapahtumat? Tätä ei voi kumota!</Modal.Body>
                    <Modal.Footer>
                        <button className="primary" onClick={() => setShowDeleteModal(false)}>Peruuta</button>
                        <button className="secondary" onClick={() => deleteEvents(...selectedEvents)}>Poista Tapahtuma(t)</button>
                    </Modal.Footer>
                </Modal>

                <Gallery.Header id="events-gallery-header">
                    <div className="header-item baseline">
                        <h2>Tapahtumat</h2>
                        <small>{property.address}</small>
                    </div>
                    
                    <div className="header-item">
                        <input type="checkbox" onChange={selectAll}/>
                        <button className="primary" disabled={selectedEvents.length === 0} onClick={() => setShowDeleteModal(true)}>Poista</button>
                        <Button id="add-event-btn" className="primary add-btn" variant="add" onClick={addEvent}>Uusi Tapahtuma</Button>
                    </div>
                </Gallery.Header>

                <Gallery.Body>
                    {
                        events.length ? 
                        events.map(item => {
                            return <EventCard property={property} event={item}/>
                        })
                        :
                        <NoEvents/>
                    }
                </Gallery.Body>
                </EventsGalleryContext.Provider>
            </Gallery>
       
        
    );
}