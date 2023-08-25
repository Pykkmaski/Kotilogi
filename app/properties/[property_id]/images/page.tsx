import GalleryProvider from "kotilogi-app/contexts/GalleryProvider";
import PropertyImagesGallery from './_components/PropertyImagesGallery';

export default function PropertyImages(props){
    const images = [];
    return (
        <GalleryProvider>
            <PropertyImagesGallery images={images}/>
        </GalleryProvider>
    );
}