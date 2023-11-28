import Gallery from "kotilogi-app/components/Experimental/Gallery/Gallery";
import EventsGallery from "kotilogi-app/components/new/Gallery/EventsGallery/EventsGallery";
import db from "kotilogi-app/dbconfig";

export default async function EventsPage({params}){
    const {title} = db('properties').where({id: params.property_id}).select('title').first();

    return(
        <>
            <EventsGallery
                propertyId={params.property_id}
                propertyAddress={title}
            />
        </>
    );
}