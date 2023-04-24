import CreateImageUrl from "../Functions/CreateImageUploadLink";
import useEvent from "../Hooks/useEvent";
import {useParams} from 'react-router-dom';

function EventHeader(props){
    const {event_id} = useParams();
    const [event, loadEvent] = useEvent(event_id);

    return (
        <header className="event-header d-flex flex-row gap-1 align-items-center">
            <div className="event-header-image-container">
                <img id="event-main-image" src={CreateImageUrl({event_id, main: true})}/>
            </div>

            <div className="event-header-info-container p-1 d-flex flex-column">
                <div id="event-header-info-body" className="d-flex flex-column gap-1">
                    <h1>{event.name}</h1>
                    <p>
                        {
                            event.description
                        }
                    </p>
                </div>

                <footer id="event-header-footer" className="d-flex flex-row gap-1 align-items-right w-100">
                    <button id="event-header-edit-button">Muokkaa</button>
                </footer>
            </div>
        </header>
    );
}

export default EventHeader;