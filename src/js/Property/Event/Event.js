import axios from 'axios';
import 'bootstrap/scss/bootstrap.scss';
import { useEffect, useState } from 'react';

function Event(props){

    const [event, setEvent] = useState(null);
    
    useEffect(() => {
        axios.get(`/property/${property_id}/event/${event_id}`).then(res => {
            setEvent(res.data);
        })
        .catch(err => {
            console.log(err.response.status);
        })
    })
    return (
        <div id="event-page">
            <header id="event-page-header">
                <img id="event-main-image"></img>
                <div id="event-information-area"></div>
            </header>
        </div>
    )
}

export default Event;