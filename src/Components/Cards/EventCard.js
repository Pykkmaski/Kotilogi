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
        </Card>
    )
}

export default EventCard;