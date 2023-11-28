import GalleryBase from "kotilogi-app/components/new/Gallery/GalleryBase/GalleryBase";
import PropertyFilesGallery from "kotilogi-app/components/new/Gallery/PropertyFilesGallery/PropertyFilesGallery";

export default function FilesPage({params}){
    return(
        <PropertyFilesGallery propertyId={params.property_id}/>
    );
}