import { useContext } from 'react';
import Card from './Card';
import PropertyContext from '../../Contexts/PropertyContext';

function EventCard({event}){

    const {property} = useContext(PropertyContext);
    const eventMainImage = `/api/images/events/${event.id}/main`;

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
                <div className="card-text">
                    <span>{event.description}</span>
                </div>
            </Card.Body>

            <Card.Footer>
                <div className="card-button-group">
                    <button className="primary" onClick={() => location.assign(`/#/properties/${property.id}/events/${event.id}/info`)}>Avaa</button>
                    <button className="black" onClick={() => showDeleteConfirmation(event.id)}>Poista</button>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default EventCard;