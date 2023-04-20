import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import 'bootstrap/scss/bootstrap.scss';
import './Style.scss';
import Images from './Images/Images';
import PDF from './PDF/PDF';

function Event(propes){
    const {event_id, property_id} = useParams();
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const [currentSection, setCurrentSection] = useState('images');

    function loadEvent(){
        setLoading(true);

        axios.get(`/property/${property_id}/events/${event_id}`).then(res => {
            setEvent(res.data);
            loadImageIds();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        loadEvent();
     }, []);

    if(loading) return <Loading message="Ladataan tapahtumaa..."/>

    return (
        <div id="event-page">
            <div id="back-link-container">
                <a href={`/#/property/${property_id}`}>Takaisin Taloon</a>
            </div>

            <header id="event-page-header">
                <img id="event-main-image" src={`/images/property/${event.property_id}/events/${event.id}/main`}/>
                <div id="event-page-header-body">
                    <h1>{event.name}</h1>
                    <p>
                        {
                            event.description
                        }
                    </p>
                </div>
            </header>
            
            <div id="event-page-sections-container">
                <header id="event-sections-header" className="w-100 d-flex flex-row justify-content-center">
                    <nav className="d-felx flex-row justify-content-center w-100 gap-3">
                        <a onClick={() => setCurrentSection('images')}>Kuvat</a>
                        <a onClick={() => setCurrentSection('pdf')}>PDF</a>
                    </nav>
                </header>

                {
                    currentSection === 'images' ? 
                    <Images/> :
                    currentSection === 'pdf' ? 
                    <PDF/> :
                    null
                }
            </div>
        </div>
    )
}

export default Event;