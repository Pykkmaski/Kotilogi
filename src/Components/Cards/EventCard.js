import { useContext } from 'react';
import Card from './Card';
import PropertyContext from '../../Contexts/PropertyContext';
import Button from '../Buttons/Button';

function EventCard({event, editing, functions}){

    const {property} = useContext(PropertyContext);
    const eventMainImage = `/api/images/events/${event.id}/image/main`;

    const type = typeof(event.date);
    const time = type === 'string' ? parseInt(event.date) : event.date;
    const date = new Date(time).toLocaleDateString('de-DE');

    return (
        <Card key={`event-card-${event.id}`}>
            <Card.Image 
                src={eventMainImage}
                loading="lazy"
                onError={(e) => {
                    e.target.src = './img/no-pictures.png';
                }}
            />
            
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <div className="card-text event-card-text">
                    <span>{event.description}</span>
                    <span id="date">{date}</span>
                </div>
            </Card.Body>
           
            {
                editing ?
                <Card.Footer>
                    <Card.ControlLink className="danger" onClick={() => functions.deleteEvent(event.id)}>Poista</Card.ControlLink>
                </Card.Footer>
                :
                <></>
            }
        </Card>
    )
}

export default EventCard;