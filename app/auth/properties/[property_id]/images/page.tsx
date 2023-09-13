import PorpertyImagesGallery from "kotilogi-app/components/new/Gallery/PropertyImagesGallery/PropertyImagesGallery";

export default async function PropertyEventsPage({params}){
    return (
        <PorpertyImagesGallery property_id={params.property_id}/>
    );
}