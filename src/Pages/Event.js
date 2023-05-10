import axios from 'axios';
import { useState, useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import useEvent from '../Hooks/useEvent';
import AppModal from '../Modals/AppModal';
import Gallery from '../Components/Gallery';
import UploadFile from '../Functions/UploadFile';
import useEventImages from '../Hooks/useEventImages';
import Section from '../Components/Section';
import EventContext from '../Contexts/EventContext';
import Image from '../Components/Image';
import UpdateEvent from '../Functions/UpdateEvent';

function InfoSection(props){
    const [editing, setEditing] = useState(false);
    const {event, loadEvent} = useContext(EventContext);
    const [showEditEventModal, setShowEditEventModal] = useState(false);

    const eventMainImage = `/api/images/events/${event.id}/main`;

    useEffect(() => {
        if(editing === true){
            setShowEditEventModal(true);
        }
        else{
            setShowEditEventModal(false);
        }
    }, [editing])
    
    return (
        <Section>
            <Section.Header>
                <h1>Tapahtuman Tiedot</h1>
                <div className="group-row">
                    <button className="primary" onClick={() => setEditing(true)}>Muokkaa Tapahtumaa</button> 
                </div>

                <AppModal
                    variant="update/event"
                    showModal={showEditEventModal}
                    setShowModal={setShowEditEventModal}
                    event={event}
                    cancelFunction={() => {
                        setEditing(false);
                    }}

                    uploadFunction={(e) => {
                        e.preventDefault();
                        console.log('ryyps');
                        const data = {
                            name: e.target.name.value,
                            description: e.target.description.value,
                        }

                        UpdateEvent(event.id, data, () => {
                            setEditing(false);
                            loadEvent();
                        });
                    }}
                />
            </Section.Header>

            <Section.Body>
                <Image src={eventMainImage} onError={(e) => e.target.src = './img/no-pictures.png'} loading='lazy'>
                    <Image.Controls>
                        <button className="primary">Korvaa</button>
                    </Image.Controls>
                </Image>
                <h2>{event.name}</h2>
                <p>
                    {event.description}
                </p>
            </Section.Body>

           
        </Section>
    )
}

function ImagesSection(props){

    const {event} = useContext(EventContext);
    const [images, loadImages] = useEventImages(event.id);

    return (
        <Section>
            <Section.Header>
                <h1>Kuvat</h1>
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        <Gallery.Button title="Lisää Kuva"/>
                        {
                            images.map(id => {
                                const imgSrc = `/api/events/${event_id}/images/${id}`;
                                return (
                                    <Gallery.Image src={imgSrc} loading="lazy" onError={(e) => e.target.src = './img/no-pictures.png'}/>
                                )
                            })
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

function FilesSection({event_id}){

    const [files, loadFiles] = useEventFiles(event_id);
    return (
        <Section>
            <Section.Header>
                <h1>Tiedostot</h1>
            </Section.Header>
            
            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        <Gallery.Button title="Lisää Tiedosto"/>
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

function Event(props){
    const {event_id, section} = useParams();
    const [event, loadEvent] = useEvent(event_id);

    function confirmEventDeletion(){

    }

    if(!event) return <Loading message="Ladataan Tapahtumaa..."/>

    return(
        <EventContext.Provider value={{event, loadEvent}}>
            <div className="event-page">
                <div className="sidebar">
                    <div className="sidebar-group">
                        <div className="sidebar-title">Tapahtuman Toiminnot</div>
                        <nav>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events/${event.id}/info`}>Tiedot</a>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events/${event.id}/images`}>Kuvat</a>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events/${event.id}/files`}>Tiedostot</a>
                        </nav>
                    </div>
                    <div className="sidebar-group">
                        <div className="sidebar-title">Muut</div>
                        <nav>
                            <a className="nav-link" href={`/#/properties/${event.property_id}/events`}>Takaisin Tapahtumiin</a>
                            <a className="nav-link" href="#" onClick={() => confirmEventDeletion()}>Poista Tapahtuma</a>
                        </nav>
                    </div>
                </div>

                <div className="event-content">
                    {
                        section === 'info' ? <InfoSection/>
                        :
                        section === 'images' ? <ImagesSection/>
                        :
                        null
                    }
                </div>
            </div>
            
        </EventContext.Provider>
        
    );
}

export default Event;