"use client";

import PropertyGalleryHeader from "./PropertyGalleryHeader";
import PropertyGalleryBody from "./PropertyGalleryBody";

export default function PropertiesGallery({properties}){

    return (
        <div className="gallery">
            <PropertyGalleryHeader properties={properties}/>
            <PropertyGalleryBody properties={properties}/>
        </div>
    )
}