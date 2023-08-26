"use client";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import Gallery, { Header, Button, GalleryOptions } from "kotilogi-app/components/Gallery/Gallery";
import Error from 'kotilogi-app/components/Gallery/Error';
import ErrorImage from 'kotilogi-app/assets/copy.png';

export default function PropertyFilesGallery(){
    const {property} = usePropertyProvider();
    const options: GalleryOptions = {
        contentType: 'file',
        contentError: (
            <Error
                title="Ei Tiedostoja"
                message="Et ole vielä lisännyt talolle tiedostoja."
                imageUrl={ErrorImage}
            />
        ),

        header: {
            title: property.address,
            subtitle: 'Tiedostot',
            buttons: [
                {
                    type: 'add',
                    action: () => console.log('Adding new file'),
                },

                {
                    type: 'delete',
                    action: () => console.log('Deleting selected files'),
                }
            ]
        }
    }
    
    return (
        <Gallery 
            contentSrc={'/api/files/property/' + property.id}
            options={options}
        />
    )
}