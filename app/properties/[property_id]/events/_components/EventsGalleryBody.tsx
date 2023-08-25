import ItemCard, {ItemType} from 'kotilogi-app/components/Cards/ItemCard';
import ItemError from 'kotilogi-app/components/Gallery/Error';
import ErrorImage from 'kotilogi-app/assets/no-event.png';

export default function EventsGalleryBody({events}){

    const errorMessage = 'Talosi ei vielä sisällä tapahtumia. Aloita painamalla yläreunassa olevaa "Lisää Uusi" -nappia.';
    const errorImageUrl = './img/no-event.png';

    return (
        <div className="gallery-body">
            { 
                events.length ?
                events.map(event => {

                    const item : ItemType = {
                        title: event.name,
                        description: event.description,
                        id: event.id,
                    }

                    return <ItemCard item={item} destinationUrl={`/properties/${event.property_id}/events/${item.id}`} imageUrl={'/'}/>
                })
                :
                <ItemError title="Ei Tapahtumia" message={errorMessage} imageUrl={ErrorImage}/>
            }
        </div>
    );
}