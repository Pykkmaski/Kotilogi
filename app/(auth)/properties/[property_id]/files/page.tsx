import GalleryBase from "kotilogi-app/components/new/Gallery/GalleryBase/Gallery";
import PropertyFilesGallery from "kotilogi-app/components/new/Gallery/PropertyFilesGallery/PropertyFilesGallery";

export default function FilesPage({params}){
    return(
        <main>
            <PropertyFilesGallery propertyId={params.property_id}/>
        </main>
        
    );
}