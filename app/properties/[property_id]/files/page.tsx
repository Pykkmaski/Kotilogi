import GalleryProvider from "kotilogi-app/contexts/GalleryProvider";
import PropertyFilesGallery from './_components/PropertyFilesGallery';

export default function PropertyFiles(props){
    const files = [];
    return (
        <GalleryProvider>
            <PropertyFilesGallery files={files}/>
        </GalleryProvider>
    );
}