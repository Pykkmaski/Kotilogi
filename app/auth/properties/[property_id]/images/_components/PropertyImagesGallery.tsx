"use client";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import Error from 'kotilogi-app/components/Gallery/Error';
import ErrorImage from 'kotilogi-app/assets/image.png';

export default function PropertyImagesGallery(){
    const {property} = usePropertyProvider();
    
    const options: GalleryOptions = {
        defaultData: {
            property_id: property.id,
        },

        apiRoutes:{
            get: `/api/images/property/${property.id}`,
            post: `/api/images/property/${property.id}`,
            del: '/api/images/property',
            put: '/api/images/property',
        },

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
                    modalOptions: {
                        headerText: 'Lisää Kuva',
                        fields: [
                            {
                                type: 'text',
                                label: 'Otsikko',
                                name: 'title',
                            },

                            {
                                type: 'textarea',
                                label: 'Kuvaus',
                                name: 'description',
                                sublabel: 'Anna vaihtoehtoinen kuvaus',
                            },

                            {
                                label: 'Tiedosto',
                                type: 'file',
                                accept: 'image/jpeg',
                                name: 'image',
                            }

                        ]
                    }
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
            options={options}
        />
    )
}