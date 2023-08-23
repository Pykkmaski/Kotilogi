import EventsGallery from './EventsGallery';
import db from 'kotilogi-app/dbconfig';

export default async function PropertyEventsPage(props){
    const events = await db('property_events').limit(10);
    return (
        <EventsGallery events={events}/>
    )
}