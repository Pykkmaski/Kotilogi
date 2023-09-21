import EventImagesGallery from "kotilogi-app/components/new/Gallery/EventImagesGallery/EventImagesGallery";

export default function EventImagesPage({params}){
    return (
        <EventImagesGallery eventId={params.event_id}/>
    );
}