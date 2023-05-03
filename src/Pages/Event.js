import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import 'bootstrap/scss/bootstrap.scss';
import useEvent from '../Hooks/useEvent';
import AppModal from '../Modals/AppModal';
import useImageIds from '../Hooks/useImageIds';
import Gallery from '../Components/Gallery';
import UploadFile from '../Functions/UploadFile';
import EventHeader from '../Components/EventHeader';

function Event(props){
    const {event_id, property_id} = useParams();
    const [event, loadEvent] = useEvent(event_id, property_id);
    const [imageIds, loadImageIds] = useImageIds(`/properties/${property_id}/events/${event_id}/images`);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [showAddImageModal, setShowAddImageModal] = useState(false);
    const [showPreviewImageModal, setShowPreviewImageModal] = useState(false);

    const selectedImageId = useRef(null);
    
    if(!event) return <Loading message="Ladataan tapahtumaa..."/>
    
    return (
        <div className="d-flex flex-column align-items-center">
            <EventHeader event={event} loadEvent={loadEvent}></EventHeader>
            
            <div id="event-page-sections-container" className="px-5">
                <Gallery title="Kuvat" secondaryTitle="Lisää Kuva" onClickHandler={() => setShowAddImageModal(true)}>
                    {
                        imageIds.map(id => {
                            const imageSrc = `/properties/${property_id}/events/${event_id}/images/${id}`;
                            return (
                                <img 
                                    loading={"lazy"} 
                                    src={imageSrc} 
                                    width="200px" 
                                    className="gallery-item" 
                                    key={`event-img-${event.id}`}
                                    onClick={() => {
                                        setShowPreviewImageModal(true);
                                        selectedImageId.current = id;
                                    }}
                                />
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
                            UploadFile(
                                e.target.image.files[0], 
                                'image', 
                                `/properties/${property_id}/events/${event_id}/images`, () => {
                                    loadImageIds(); 
                                    setShowAddImageModal(false);
                            })
                            }
                        }
                />

                <AppModal 
                    variant="show/image"
                    showModal={showPreviewImageModal}
                    setShowModal={setShowPreviewImageModal}
                    imageUrl={`/properties/${property_id}/events/${event_id}/images/${selectedImageId.current}`}

                    setImageAsMain={() => {
                        axios.post(`properties/${property_id}/events/${event_id}/images/main/${selectedImageId.current}`)
                        .then(res => {
                            setShowPreviewImageModal(false);
                            loadImageIds();
                        })
                        .catch(err => console.log(err.message));
                    }}

                    deleteSelectedImage={() => {
                        axios.delete(`/properties/${property_id}/events/${event_id}/images/${selectedImageId.current}`)
                        .then(res => {
                            setShowPreviewImageModal(false);
                            loadImageIds();
                        })
                        .catch(err => console.log(err.message));
                    }}
                />

            </div>
        </div>
    )
}

export default Event;