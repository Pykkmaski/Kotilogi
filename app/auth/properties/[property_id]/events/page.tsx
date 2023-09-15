import { serverGetDataById } from "kotilogi-app/actions/serverGetData";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import EventsGallery from "kotilogi-app/components/new/Gallery/EventsGallery/EventsGallery";

export default async function PropertyEventsPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as Kotilogi.PropertyType | null;
    throwErrorIfNull(property, 'Virhe ladattaessa taloa!');

    return (
       <EventsGallery
            property_id={property!.id as string}
            property_address={property!.address}
       />
    )

}