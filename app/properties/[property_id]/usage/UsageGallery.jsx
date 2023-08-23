"use client";

import UsageGalleryHeader from './UsageGalleryHeader';
import UsageGalleryBody from './UsageGalleryBody';

import './styles.scss';

export default function UsageGallery({usage}){
    return (
        <div className="gallery">
            <UsageGalleryHeader/>
            <UsageGalleryBody/>
        </div>
    )
}