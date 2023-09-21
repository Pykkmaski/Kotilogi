import PorpertyImagesGallery from "kotilogi-app/components/new/Gallery/PropertyImagesGallery/PropertyImagesGallery";

export default async function PropertyEventsPage({params}){
    return (
        <PorpertyImagesGallery propertyId={params.property_id}/>
    );
}