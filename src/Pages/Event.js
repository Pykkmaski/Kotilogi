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

function Event(props){
    const {event_id, property_id} = useParams();
    const [event, loadEvent] = useEvent(event_id);
    const [imageIds, loadImageIds] = useImageIds(event_id);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [showAddImageModal, setShowAddImageModal] = useState(false);

    if(!event) return <Loading message="Ladataan tapahtumaa..."/>
    
    return (
        <div className="d-flex flex-column px-5 align-items-center">
            <div className="d-flex flex-row w-100">
                <a href={`/#/property/${event.property_id}/events`}>Takaisin Taloon</a>
            </div>

            <header className="d-flex flex-row align-items-center w-100">
                <img id="event-main-image" src={CreateImageUrl({property_id: event.property_id, event_id: event.id, main: true})}/>
                <div id="event-page-header-body">
                    <EditableField 
                        content={event.name} 
                        updateFunction={(content) => UpdateEvent(event_id, {name: content}, () => loadEvent())}
                    />

                    <EditableField 
                        type="textarea" 
                        content={event.description} 
                        updateFunction={(content) => UpdateEvent(event_id, {description: content}, () => loadEvent())}
                    />

                    <EditableField 
                        type="date" 
                        content={event.date} 
                        updateFunction={(content) => UpdateEvent(event_id, {date: content}, () => loadEvent())}
                    />
                </div>
            </header>
            
            <div id="event-page-sections-container">
                <Gallery title="Kuvat" secondaryTitle="Lisää Kuva" onClickHandler={() => setShowAddImageModal(true)}>
                    {
                        imageIds.map(id => {
                            return (
                                <img src={`/images/property/${event.property_id}/${id}`} width="200px" className="gallery-item"/>
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