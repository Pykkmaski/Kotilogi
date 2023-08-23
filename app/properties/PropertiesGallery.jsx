"use client";

import ItemGalleryWrapper from "kotilogi-app/contexts/ItemGalleryContext";
import PropertyGalleryHeader from "./PropertyGalleryHeader";
import PropertyGalleryBody from "./PropertyGalleryBody";

export default function PropertiesGallery({properties}){
    return (
        <ItemGalleryWrapper content={properties} apiRoute={'/api/properties/'}>
            <div className="gallery">
                <PropertyGalleryHeader/>
                <PropertyGalleryBody/>
            </div>
        </ItemGalleryWrapper>
    )
}