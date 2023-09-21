import PropertyFilesGallery from "kotilogi-app/components/new/Gallery/PropertyFilesGallery/PropertyFilesGallery";

export default async function PropertyEventsPage({params}){
    return (
       <PropertyFilesGallery propertyId={params.property_id}/>
    );
}