import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import useEvent from '../../Hooks/useEvent';
import EventContext from '../../Contexts/EventContext';
import InfoSection from './InfoSection';
import ImagesSection from './ImagesSection';
import FilesSection from './FilesSection';

function Event(props){
    const {event_id, section} = useParams();
    const [event, loadEvent] = useEvent(event_id);

    function confirmEventDeletion(){

    }

    if(!event) return <Loading message="Ladataan Tapahtumaa..."/>

    return(
        <EventContext.Provider value={{event, loadEvent}}>
            <div className="event-page">
                <div className="sidebar">
                    <div className="sidebar-group">
                        <div className="sidebar-title">Tapahtuman Toiminnot</div>
                        <nav>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events/${event.id}/info`}>Tiedot</a>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events/${event.id}/images`}>Kuvat</a>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events/${event.id}/files`}>Tiedostot</a>
                        </nav>
                    </div>
                    <div className="sidebar-group">
                        <div className="sidebar-title">Muut</div>
                        <nav>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events`}>Takaisin Tapahtumiin</a>
                            <a className="nav-link" href="#" onClick={() => confirmEventDeletion()}>Poista Tapahtuma</a>
                        </nav>
                    </div>
                </div>

                <div className="event-content">
                    {
                        section === 'info' ? <InfoSection/>
                        :
                        section === 'images' ? <ImagesSection/>
                        :
                        section === 'files' ? <FilesSection/>
                        :
                        null
                    }
                </div>
            </div>
            
        </EventContext.Provider>
        
    );
}

export default Event;