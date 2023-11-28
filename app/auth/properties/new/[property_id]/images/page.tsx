import PropertyImagesGallery from "kotilogi-app/components/new/Gallery/PropertyImagesGallery/PropertyImagesGallery";

export default function EventsPage({params}){
    return(
        <PropertyImagesGallery propertyId={params.property_id}/>
    );
}