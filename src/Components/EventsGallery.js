import {useContext, useState} from 'react';
import AppContext from "../Contexts/AppContext";
import EventsGalleryContext from "../Contexts/EventsGalleryContext";
import useProperties from "../Hooks/useProperties";
import Button from "./Buttons/Button";
import { EventCard } from "./Cards/EventCard.new";
import NoEvents from "./Error/NoEvents";
import Gallery from './Gallery';
import Delete from '../Functions/Delete';
import AddEvent from '../Functions/AddEvent';
import useEvents from '../Hooks/useEvents';
import { Redirect, useNavigate } from 'react-router-dom';

export function EventsGallery({property}){
    const navigate = useNavigate();
    const {user} = useContext(AppContext);
    const [events, loadEvents] = useEvents(property.id);
    //const [displayProperties, setDisplayProperties] = useState([]); //These change depending on what is typed in the search bar.
    const [selectedEvents, setSelectedEvents] = useState([]);

    if(!events) return <Loading message="Ladataan Tapahtumia..."/>
    //setDisplayProperties(properties);

    function deleteEvents(){
        for(const id of arguments){
            console.log('Deleting event ' + id)
            Delete('/api/properties/' + id, () => null);
        }

        loadEvents();
        setSelectedEvents([]);
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
        }

        AddEvent(newEvent, (newEventId) => {
            navigate(`/properties/${property.id}/events/${newEventId}`);
        });
    }
    const contextValue = {
        deleteEvents,
        selectEvent,
    }

    return (
            <Gallery id="events-gallery">
                <EventsGalleryContext.Provider value={contextValue}>
                <Gallery.Header id="events-gallery-header">
                    <div className="header-item baseline">
                        <h1>Tapahtumat</h1>
                        <small>{property.address}</small>
                    </div>
                    
                    <div className="header-item">
                        <button className="primary" disabled={selectedEvents.length === 0} onClick={() => deleteEvents(...selectedEvents)}>Poista</button>
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