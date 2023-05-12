import { useContext, useState } from "react";
import EventContext from "../../Contexts/EventContext";
import Image from "../../Components/Image";
import UpdateEvent from '../../Functions/UpdateEvent';
import UpdateEventModal from "../../Modals/UpdateEventModal";

function Header(props){
    const {event, loadEvent} = useContext(EventContext);
    const [showModal, setShowModal] = useState(false);

    const eventMainImage = `/api/images/events/${event.id}/main`;

    return (
        <div className="event-header">
            <div className="event-header-buttons">
                <button className="primary" onClick={() => location.assign(`/#/properties/${event.property_id}/events`)}>Takaisin Tapahtumaan</button>
                <button className="primary" onClick={() => setShowModal(true)}>Muokkaa Tapahtumaa</button>
            </div>

            <div className="event-header-body">
                <div className="event-info-container">
                    <Image src={eventMainImage}/>
                    <div className="event-text-container">
                        <h1>{event.name}</h1>
                        <p>
                            {
                                event.description
                            }
                        </p>
                    </div>
                </div>
            </div>  

            <UpdateEventModal
                event={event}
                showModal={showModal}
                setShowModal={setShowModal}
                updateFunction={(e) => {
                    e.preventDefault();
                    const content = {
                        name: e.target.name.value,
                        description: e.target.description.value,
                    }

                    UpdateEvent(event.id, content, () => loadEvent());
                    setShowModal(false);
                }}
            /> 
        </div>
        
    );
}

export default Header;