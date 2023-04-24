import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import 'bootstrap/scss/bootstrap.scss';
import ImageContainer from '../Components/ImageContainer';
import Button from 'react-bootstrap/Button';
import Modal from '../Modals/AppModal';
import Form from 'react-bootstrap/Form';
import EditableField from '../Components/EditableField';
import useEvent from '../Hooks/useEvent';
import UpdateEvent from '../Functions/UpdateEvent';

function Event(props){
    const {event_id, property_id} = useParams();
    const [event, loadEvent] = useEvent(event_id);
    const [showEditEventModal, setShowEditEventModal] = useState(false);

    if(!event) return <Loading message="Ladataan tapahtumaa..."/>

    return (
        <div className="d-flex flex-column px-5 align-items-center">
            <div className="d-flex flex-row w-100">
                <a href={`/#/property/${event.property_id}/events`}>Takaisin Taloon</a>
            </div>

            <header className="d-flex flex-row align-items-center w-100">
                <img id="event-main-image" src={`/images/property/${event.property_id}/events/${event.id}/main`}/>
                <div id="event-page-header-body">
                    <EditableField 
                        content={event.name} 
                        updateFunction={(content) => UpdateEvent(event_id, {name: content}, () => loadEvent())}
                    />

                    <EditableField 
                        type="textarea" 
                        content={event.description} 
                        updateFunction={(content) => UpdateEvent(event_id, {description: content}, () => loadEvent())}
                    />

                    <EditableField 
                        type="date" 
                        content={event.date} 
                        updateFunction={(content) => UpdateEvent(event_id, {date: content}, () => loadEvent())}
                    />
                </div>
            </header>
            
            <div id="event-page-sections-container">
                <ImageContainer loadEvent/>
            </div>
        </div>
    )
}

export default Event;