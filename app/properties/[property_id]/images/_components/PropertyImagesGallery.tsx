"use client";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import Gallery, { Header, Button, GalleryOptions } from "kotilogi-app/components/Gallery/Gallery";
import Error from 'kotilogi-app/components/Gallery/Error';
import ErrorImage from 'kotilogi-app/assets/image.png';

export default function PropertyImagesGallery(){
    const {property} = usePropertyProvider();
    const options: GalleryOptions = {
        contentType: 'image',
        contentError: (
            <Error
                title="Ei Kuvia"
                message="Et ole vielä lisännyt talolle kuvia."
                imageUrl={ErrorImage}
            />
        ),

        header: {
            title: property.address,
            subtitle: 'Kuvat',
            buttons: [
                {
                    type: 'add',
                    action: () => console.log('Adding new image'),
                },

                {
                    type: 'delete',
                    action: () => console.log('Deleting selected images'),
                }
            ]
        }
    }
    
    return (
        <Gallery 
            contentSrc={'/api/images/property/' + property.id}
            options={options}
        />
    )
}