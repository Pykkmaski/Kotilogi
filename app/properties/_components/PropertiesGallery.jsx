"use client";

import GalleryProvider from "kotilogi-app/contexts/GalleryProvider";
import PropertyGalleryHeader from "./PropertyGalleryHeader";
import PropertyGalleryBody from "./PropertyGalleryBody";
import { useSession } from "next-auth/react";
import Spinner from "kotilogi-app/components/Spinner/Spinner";

export default function PropertiesGallery({properties}){
    const {session, loading} = useSession();

    if(loading) return <Spinner size="3rem"></Spinner>

    return (
        <div className="gallery">
            <PropertyGalleryHeader/>
            <PropertyGalleryBody/>
        </div>
    )
}