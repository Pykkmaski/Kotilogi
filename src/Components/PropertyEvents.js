import CreateImageUrl from "../Functions/CreateImageUploadLink";
import useEvents from "../Hooks/useEvents";
import Spinner from './Spinner.js';

function PropertyEvents(props){
    const [events, loadEvents] = useEvents(props.property_id);
    if(!events) return <Spinner/>

    return (
        <Gallery>
            {
                events.map(event => {
                    return (
                        <Card className="event-card gallery-item">
                            <Card.Img src={CreateImageUrl({property_id: event.property_id, event_id: event.id, main: true})} variant="top"></Card.Img>
                            <Card.Body>
                            <Card.Title className="text-ellipsis">{ev.name}</Card.Title>
                            <Card.Text className="event-card-text">{ev.description}</Card.Text>

                            <div className="card-button-group">
                                <Button variant="secondary" className="w-100" onClick={() => showDeleteConfirmation(event.id)}>Poista</Button>
                                <Button variant="primary" className="w-100" onClick={() => linkToEvent(`/property/${event.property_id}/events/${event.id}`)}>Avaa</Button>
                            </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </Gallery>
    )
}

export default PropertyEvents;