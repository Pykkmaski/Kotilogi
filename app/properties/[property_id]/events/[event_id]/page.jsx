import Loading from '../Loading';
import Header from './Header';
import ImagesSection from './ImagesSection';
import FilesSection from './FilesSection';
import EventWrapper from 'kotilogi-app/contexts/EventContext';

export default function EventPage(props){
    //const {event_id, section} = useParams();
    //const [event, loadEvent] = useEvent(event_id);
    //const [mainImageId, loadMainImageId] = useMainImage({event_id});

    if(!event) return <Loading message="Ladataan Tapahtumaa..."/>

    return(
        <div className="event-page">
            <EventContext.Provider value={{event, loadEvent, mainImageId, loadMainImageId}}>
                <Header/>
                <ImagesSection/>
                <FilesSection/>
            </EventContext.Provider>
        </div>
    );
}