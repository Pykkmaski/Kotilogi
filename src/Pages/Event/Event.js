import { useParams } from 'react-router-dom';
import {useState} from 'react';
import Loading from '../Loading';
import useEvent from '../../Hooks/useEvent';
import Header from './Header';
import ImagesSection from './ImagesSection';
import FilesSection from './FilesSection';
import EventContext from '../../Contexts/EventContext';
import useMainImage from '../../Hooks/useMainImage';

function Event(props){
    const {event_id, section} = useParams();
    const [event, loadEvent] = useEvent(event_id);

    if(!event) return <Loading message="Ladataan Tapahtumaa..."/>

    return(
        <EventContext.Provider value={{event, loadEvent}}>
            <div className="event-page">
                <Header/>
                <ImagesSection/>
                <FilesSection/>
            </div>
        </EventContext.Provider>
       
    );
}

export default Event;