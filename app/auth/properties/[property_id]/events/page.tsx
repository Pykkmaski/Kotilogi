import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import GalleryError from "kotilogi-app/components/Gallery/Error";
import ErrorImage from 'kotilogi-app/assets/history.png';
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import { serverGetDataById, serverGetDataByPropertyId } from "kotilogi-app/actions/serverGetData";
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