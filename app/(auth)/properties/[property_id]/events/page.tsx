import EventsGallery from "kotilogi-app/components/new/Gallery/EventsGallery/EventsGallery";

export default async function EventsPage({params}){
    return (
        <main>
            <EventsGallery propertyId={params.property_id} propertyAddress=""/>
        </main>
    );
}