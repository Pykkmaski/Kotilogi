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
import useEventImages from '../Hooks/useEventImages';

function Event(props){
    const {event_id} = useParams();
    const [event, loadEvent] = useEvent(event_id);
    const [images, loadImages] = useEventImages(event_id);
    const [showAddImageModal, setShowAddImageModal] = useState(false);
    const [showPreviewImageModal, setShowPreviewImageModal] = useState(false);

    const selectedImageId = useRef(null);
    
    if(!event) return <Loading message="Ladataan tapahtumaa..."/>
    
    return (
        <div className="d-flex flex-column align-items-center">
            <EventHeader event={event} loadEvent={loadEvent}></EventHeader>
            
            <div id="event-page-sections-container" className="px-5">
                <Gallery title="Kuvat" buttonTitle="Lisää Kuva" onClickHandler={() => setShowAddImageModal(true)}>
                    {
                        images.map(id => {
                            const imageSrc = `/api/images/events/image/${id}`;
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
                                `/api/images/events/${event_id}`, () => {
                                    loadImages(); 
                                    setShowAddImageModal(false);
                            })
                            }
                        }
                />

                <AppModal 
                    variant="show/image"
                    showModal={showPreviewImageModal}
                    setShowModal={setShowPreviewImageModal}
                    imageUrl={`/api/images/${selectedImageId.current}`}

                    setImageAsMain={() => {
                        axios.post(`/api/images/events/${event_id}/main`, {
                            image_id: selectedImageId.current
                        })
                        .then(res => {
                            setShowPreviewImageModal(false);
                            loadImageIds();
                        })
                        .catch(err => console.log(err.message));
                    }}

                    deleteSelectedImage={() => {
                        axios.delete(`/api/images/${selectedImageId.current}`)
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