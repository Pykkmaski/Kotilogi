"use client";

import GalleryProvider from 'kotilogi-app/contexts/GalleryProvider';
import EventsGalleryHeader from './EventsGalleryHeader';
import EventsGalleryBody from './EventsGalleryBody';

export default function EventsGallery({events}){

    return (
        <GalleryProvider content={events} apiRoute={'/api/events'}>
            <div className="gallery">
                <EventsGalleryHeader/>
                <EventsGalleryBody/>
            </div>
        </GalleryProvider>
        
    )
}