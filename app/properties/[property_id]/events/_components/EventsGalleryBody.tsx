import ItemCard, {ItemType} from 'kotilogi-app/components/Cards/ItemCard';
import ItemError from 'kotilogi-app/components/Gallery/Error';
import ErrorImage from 'kotilogi-app/assets/history.png';
import { Body } from 'kotilogi-app/components/Gallery/Gallery';

export default function EventsGalleryBody({events}){

    const errorMessage = 'Talosi ei vielä sisällä tapahtumia. Aloita painamalla yläreunassa olevaa "Lisää Uusi" -nappia.';
    const error = <ItemError title="Ei Tapahtumia" message={errorMessage} imageUrl={ErrorImage}/>

    return (
        <Body 
            content={events}
            contentType="event"
            error={error}
        />
    );
}