import { useContext, useState } from "react";
import EventContext from "../../Contexts/EventContext";
import Image from "../../Components/Image";
import UpdateEvent from '../../Functions/UpdateEvent';
import UpdateEventModal from "../../Components/Modals/UpdateEventModal";
import useMainImage from "../../Hooks/useMainImage";
import Update from '../../Functions/Update';

function Header(props){
    const {event, loadEvent, mainImageId} = useContext(EventContext);
    const [showModal, setShowModal] = useState(false);
    const mainImageUrl = `/api/images/events/image/${mainImageId}`;

    const date = new Date(event.date).toLocaleDateString('fi-FI');
    
    return (
        <div className="event-header">
            <div className="event-header-buttons">
                <button className="primary" onClick={() => location.assign(`/#/properties/${event.property_id}/events`)}>Takaisin Tapahtumiin</button>
                <button className="primary" onClick={() => setShowModal(true)}>Muokkaa Tapahtumaa</button>
            </div>

            <div className="event-header-body">
                <div className="event-info-container">
                    <Image src={mainImageUrl}>

                    </Image>
                    <div className="event-text-container">
                        <h1>{event.name}</h1>
                        <p>
                            {
                                event.description
                            }
                        </p>

                        <span id="date">{date}</span>
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
                        date: new Date(e.target.date.value).getTime(),
                    }

                    Update(`/api/events/${event.id}`, content, () => loadEvent());
                    setShowModal(false);
                }}
            /> 
        </div>
        
    );
}

export default Header;