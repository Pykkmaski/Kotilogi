import Card from "./Card";
import {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import EventsGalleryContext from "../../Contexts/EventsGalleryContext";

export function EventCard({property, event}){
    const [selected, setSelected] = useState(false);
    const {deleteEvents, selectEvent, selectedEvents} = useContext(EventsGalleryContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const eventMainImage = '/api/images/events/' + event.id + '/main';

    function checkboxHandler(e){
        console.log('Checkbox changed');
        const newState = !selected;
        setSelected(newState);
        selectEvent(event.id);
    }

    useEffect(() => {
        setSelected(selectedEvents.includes(event.id));
    }, [selectedEvents]);

    return (
        <Card className={selected ? 'selected' : null}>
            <Link to={`/properties/${property.id}/events/${event.id}`}>
                <Card.Image src={eventMainImage} loading="lazy"></Card.Image>
                <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <div className="card-text">{event.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={checkboxHandler} checked={selectedEvents.includes(event.id)}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(!menuOpen)}></img>
            </Card.Footer>

            <Card.Menu open={menuOpen}>
                <nav>
                    <span onClick={() => deleteEvents(event.id)}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}