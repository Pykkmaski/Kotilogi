"use client";
import { usePropertyProvider } from "kotilogi-app/contexts/PropertyProvider";
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import {GalleryOptions, AcceptType} from 'kotilogi-app/components/Gallery/Types';
import Error from 'kotilogi-app/components/Gallery/Error';
import ErrorImage from 'kotilogi-app/assets/copy.png';

export default function PropertyFilesGallery(){
    const {property} = usePropertyProvider();

    const options: GalleryOptions = {
        defaultData: {
            property_id: property.id,
            mime_type: 'application/pdf' as AcceptType,
        },

        apiRoutes:{
            get: `/api/files/property/${property.id}`,
            post: '/api/files/property/' + property.id,
            del: '/api/files/property',
            put: '/api/files/property',
        },
        
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
                    modalOptions:{
                        headerText: 'Lisää Tiedosto',
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
                                type: 'file',
                                label: 'Tiedosto',
                                name: 'file',
                                accept: 'application/pdf',
                            }

                        ]
                    }
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