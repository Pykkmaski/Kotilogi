import PropertyImagesGallery from "kotilogi-app/components/new/Gallery/PropertyImagesGallery/PropertyImagesGallery";

export default async function PropertyEventsPage({params}){
    return (
        <PropertyImagesGallery propertyId={params.property_id}/>
    );
}