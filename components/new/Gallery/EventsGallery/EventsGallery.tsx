import { serverGetData } from "kotilogi-app/actions/serverGetData";
import GalleryWithDelete from "../GalleryWithDelete/GalleryWithDelete";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";

export default async function EventsGallery(props: EventsGallery.Props){
    const events = await serverGetData('property_events', {property_id: props.property_id}, false);
    throwErrorIfNull(events, 'Tapahtumien lataaminen epäonnistui!');
    
    return (
        <GalleryWithDelete
            data={events}
            title="Tapahtumat"
            subtitle={props.property_address}
            headerButtons={[]}
            addModalOptions={addModalOptions}
        />
    )
}