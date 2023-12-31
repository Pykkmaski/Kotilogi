import PropertyImagesGallery from "kotilogi-app/components/new/Gallery/PropertyImagesGallery/PropertyImagesGallery";

export default function EventsPage({params}){
    return(
        <main>
            <PropertyImagesGallery propertyId={params.property_id}/>
        </main> 
    );
}