"use client";

import { usePropertyContext } from "kotilogi-app/contexts/PropertyProvider"

function GalleryHeader({property}){
    return (
        <div className="gallery-header">
            <div>
                <h1>{property.address}</h1>
                <small>Tiedot</small>
            </div>
        </div>
    )
}

function GalleryBody({property}){
    return (
        <div className="gallery-body">
            <h1>Talon {property.id} Tiedot.</h1>
        </div>
    )
}

export default function PropertyInfoGallery(props){
    const {property} = usePropertyContext();

    return (
        <div className="gallery">
            <GalleryHeader property={property}/>
            <GalleryBody property={property}/>
        </div>
    )
}