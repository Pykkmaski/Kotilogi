import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import 'bootstrap/scss/bootstrap.scss';
import EditableField from '../Components/EditableField';
import useEvent from '../Hooks/useEvent';
import UpdateEvent from '../Functions/UpdateEvent';
import AppModal from '../Modals/AppModal';
import useImageIds from '../Hooks/useImageIds';
import Gallery from '../Components/Gallery';
import UploadFile from '../Functions/UploadFile';
import CreateImageUrl from '../Functions/CreateImageUploadLink';
import EventHeader from '../Components/EventHeader';

function Event(props){
    const {event_id, property_id} = useParams();
    const [event, loadEvent] = useEvent(event_id);
    const [imageIds, loadImageIds] = useImageIds(event_id);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [showAddImageModal, setShowAddImageModal] = useState(false);

    if(!event) return <Loading message="Ladataan tapahtumaa..."/>
    
    return (
        <div className="d-flex flex-column align-items-center">
            <EventHeader event={event} loadEvent={loadEvent}></EventHeader>
            
            <div id="event-page-sections-container" className="px-5">
                <Gallery title="Kuvat" secondaryTitle="Lisää Kuva" onClickHandler={() => setShowAddImageModal(true)}>
                    {
                        imageIds.map(id => {
                            return (
                                <img src={`/images/property/${event.property_id}/${id}`} width="200px" className="gallery-item" key={`event-img-${event.id}`}/>
                            )
                        })
                    }
                </Gallery>

                <AppModal
                    variant="upload/image"
                    showModal={showAddImageModal}
                    setShowModal={setShowAddImageModal}
                    uploadFunction={
                        (e) => {
                            e.preventDefault(); 
                            UploadFile(e.target.image.files[0], 'image', {property_id: event.property_id, event_id}, () => {
                                loadImageIds(); 
                                setShowAddImageModal(false);
                            })
                            }
                        }
                />

            </div>
        </div>
    )
}

export default Event;