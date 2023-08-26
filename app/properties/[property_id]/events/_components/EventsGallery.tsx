"use client";

import Error from 'kotilogi-app/components/Gallery/Error';
import Gallery, { GalleryOptions } from 'kotilogi-app/components/Gallery/Gallery';
import { usePropertyProvider } from 'kotilogi-app/contexts/PropertyProvider';
import ErrorImage from 'kotilogi-app/assets/history.png';

export default async function EventsGallery({property_id}){
    const {property} = usePropertyProvider();

    const options: GalleryOptions = {
        contentType: 'event',
        contentError: (
            <Error
                title="Ei Tapahtumia"
                message="Et ole vielä lisännyt talolle tapahtumia."
                imageUrl={ErrorImage}
            />
        ),

        header: {
            title: property.address,
            subtitle: 'Tapahtumat',
            buttons: [
                {
                    type: 'add',
                    action: () => console.log('Adding new event'),
                },

                {
                    type: 'delete',
                    action: () => console.log('Deleting selected items'),
                }
            ]
        }
    }

    return (
        <Gallery 
            contentSrc={`/api/events/property/${property.id}`}
            options={options}
        />
    )
}