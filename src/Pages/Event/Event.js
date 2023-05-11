import { useParams } from 'react-router-dom';
import {useState} from 'react';
import Loading from '../Loading';
import useEvent from '../../Hooks/useEvent';
import EventContext from '../../Contexts/EventContext';
import Section from '../../Components/Section';
import Image from '../../Components/Image';
import Header from './Header';
import ImagesSection from './ImagesSection';
import FilesSection from './FilesSection';
import UpdateEvent from '../../Functions/UpdateEvent';
import UploadImageModal from '../../Modals/UploadImageModal';
import UpdateEventModal from '../../Modals/UpdateEventModal';

function Event(props){
    const {event_id, section} = useParams();
    const [event, loadEvent] = useEvent(event_id);
    const [showUpdateEventModal, setShowUpdateEventModal] = useState(false);
    const [showUploadImageModal, setShowUploadImageModal] = useState(false);

    if(!event) return <Loading message="Ladataan Tapahtumaa..."/>

    return(
        <EventContext.Provider value={{event, loadEvent, setShowUploadImageModal, setShowUpdateEventModal}}>
            <div className="event-page">
               <Header/>
               <ImagesSection/>

                <UpdateEventModal
                    event={event}
                    showModal={showUpdateEventModal}
                    setShowModal={setShowUpdateEventModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        const content = {
                            name: e.target.name.value,
                            description: e.target.description.value,
                        }

                        UpdateEvent(event.id, content, () => loadEvent());
                    }}
                />

                <UploadImageModal
                    showModal={showUploadImageModal}
                    setShowModal={setShowUploadImageModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        UploadFile(e.target.image.files[0], 'image', () => loadImages());
                    }}
                />


            </div>
            
        </EventContext.Provider>
        
    );
}

export default Event;