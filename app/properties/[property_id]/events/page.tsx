import GalleryProvider from 'kotilogi-app/contexts/GalleryProvider';
import EventsGallery from './_components/EventsGallery';
import db from 'kotilogi-app/dbconfig';

export default async function PropertyEventsPage({params}){
    const events = await db('property_events').where({property_id: params.property_id});
    return (
        <GalleryProvider>
            <EventsGallery events={events}/>
        </GalleryProvider>  
    );
}