import AppModal from "../Modals/AppModal";
import UpdateEvent from "../Functions/UpdateEvent";
import {useEffect, useState} from 'react';

function EventHeader(props){
    const {event, loadEvent} = props;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const eventMainImage = `/api/images/events/${event.id}/main`;

    return (
        <header id="event-header" className="d-flex flex-column w-100 gap-1 p-5 bg-gray justify-content-center">
            <div id="event-header-back-link-container" className="justify-content-left w-100">
                <button onClick={() => location.assign(`/#/properties/${event.property_id}/events`)}>Takaisin Taloon</button>
            </div>

            <div id="event-header-body" className="d-flex flex-row gap-1">
                <div className="event-header-image-container">
                    <img 
                        id="event-main-image" 
                        src={eventMainImage} 
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = './img/no-pictures.png';
                        }}/>
                </div>

                <div id="event-header-info-container" className="p-1 d-flex flex-column">
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
                uploadFunction={(e) => {
                    e.preventDefault();
                    const content = {
                        name: e.target.name.value,
                        description: e.target.description.value,
                        date: e.target.date.value
                    }

                    UpdateEvent(event.id, content, () => {
                        setShowUpdateModal(false);
                        loadEvent();
                    })
                }}
            />
        </header>
    );
}

export default EventHeader;