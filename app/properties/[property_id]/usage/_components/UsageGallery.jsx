"use client";

import UsageGalleryHeader from './UsageGalleryHeader';
import UsageGalleryBody from './UsageGalleryBody';

export default function UsageGallery({usage}){
    return (
        <div className="gallery">
            <UsageGalleryHeader/>
            <UsageGalleryBody/>
        </div>
    )
}