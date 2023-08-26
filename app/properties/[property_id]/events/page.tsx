import EventsGallery from './_components/EventsGallery';

export default async function PropertyEventsPage({params}){
    const property_id = params.property_id;

    return <EventsGallery property_id={property_id}/>

}