import { useContext, useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import AppContext from "../../Contexts/AppContext";
import Loading from '../../Loading/Loading';

function EventDetails(){
    const {property_id, event_id} = useParams();
    const [pictures, setPictures] = useState([]);
    const [event, setEvent] = useState(null);
    const {user} = useContext(AppContext);
    const [error, setError] = useState(200);

    useEffect(() => {
        const req = new XMLHttpRequest();
        req.open('GET', `/property/${property_id}/events/${event_id}`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.timeout = 10000;

        req.ontimeout = () => {
            console.log('Yhteys aikakatkaistiin');
        }

        req.onload = () => {
            if(req.status === 200){
                setEvent(JSON.parse(req.response));
            }
            else{   
                setError(req.status);
            }
        }
    }, []);

    if (!event) return <Loading message="Ladataan tapahtumaa..."/>

    return (
        <div id="event-details" className="page">
            <div className="grid-item flex-column gap-m padding-m center-align bg-primary">
                <h1>{event.name}</h1>
            </div>

            <div id="event-pictures" className="grid-item padding-m">
                {
                    pictures.map(pic => {
                        return (
                            <div className="rounded picture-frame"/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventDetails;