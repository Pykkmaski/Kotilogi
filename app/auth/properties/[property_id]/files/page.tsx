import PropertyFilesGallery from "kotilogi-app/components/new/Gallery/PropertyFilesGallery/PropertyFilesGallery";

export default async function PropertyEventsPage({params}){
    return (
       <PropertyFilesGallery property_id={params.property_id}/>
    );
}