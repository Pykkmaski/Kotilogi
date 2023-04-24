import CreateImageUrl from "../Functions/CreateImageUploadLink";
import useEvent from "../Hooks/useEvent";
import {useParams} from 'react-router-dom';
import AppModal from "../Modals/AppModal";
import UpdateEvent from "../Functions/UpdateEvent";
import {useState} from 'react';

function EventHeader(props){
    const {event, loadEvent} = props;
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    return (
        <header className="d-flex flex-column w-100 gap-1 p-3 bg-gray justify-content-center">
            <div id="event-header-back-link-container" className="justify-content-left">
                <button onClick={() => location.assign(`/#/property/${event.property_id}/events`)}>Takaisin Taloon</button>
            </div>

            <div id="event-header-body" className="d-flex flex-row gap-1">
                <div className="event-header-image-container">
                    <img id="event-main-image" src={CreateImageUrl({event_id: event.id, main: true})}/>
                </div>

                <div className="event-header-info-container p-1 d-flex flex-column">
                    <div id="event-header-info-body" className="d-flex flex-column gap-1 fill">
                        <h1>{event.name}</h1>
                        <p>
                            {
                                event.description
                            }
                        </p>
                    </div>

                    <footer id="event-header-info-footer" className="d-flex flex-row gap-1 justify-content-end">
                        <button id="event-header-edit-button" onClick={() => setShowUpdateModal(true)}>Muokkaa</button>
                    </footer>
                </div>
            </div>
           
           <AppModal 
                variant="update/event"
                showModal={showUpdateModal}
                setShowModal={setShowUpdateModal}
                event={event}
                updateFunction={(e) => {
                    e.preventDefault();
                    console.log('kalja');
                }}
            />
        </header>
    );
}

export default EventHeader;