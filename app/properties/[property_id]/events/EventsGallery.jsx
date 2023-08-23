"use client";

import ItemGalleryWrapper from 'kotilogi-app/contexts/ItemGalleryContext';
import EventsGalleryHeader from './EventsGalleryHeader';
import EventsGalleryBody from './EventsGalleryBody';

export default function EventsGallery({events}){

    return (
        <ItemGalleryWrapper content={events} apiRoute={'/api/events'}>
            <div className="gallery">
                <EventsGalleryHeader/>
                <EventsGalleryBody/>
            </div>
        </ItemGalleryWrapper>
        
    )
}