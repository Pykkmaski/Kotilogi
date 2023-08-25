"use client";

import EventsGalleryHeader from './EventsGalleryHeader';
import EventsGalleryBody from './EventsGalleryBody';

export default async function EventsGallery({events}){
    return (
        <div className="gallery">
            <EventsGalleryHeader/>
            <EventsGalleryBody events={events}/>
        </div>
    )
}