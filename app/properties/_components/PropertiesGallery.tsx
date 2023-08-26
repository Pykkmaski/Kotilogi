"use client";

import Error from 'kotilogi-app/components/Gallery/Error';
import ErrorImage from 'kotilogi-app/assets/house.png';
import Gallery, {GalleryOptions} from 'kotilogi-app/components/Gallery/Gallery';
import axios from 'axios';

export default function PropertiesGallery({session}){
    function addProperty(e){
        const property = {
            address: e.target.address.value,
            description: e.target.description.value,
            owner: session.user.email,
        }
    
        axios.post('/api/properties/', property)
        .catch(err => console.log(err.message));
    }
    
    const galleryOptions: GalleryOptions = {
        contentType: 'property',
        contentError: (
            <Error 
                title="Ei Taloja"
                message="Et ole vielä lisännyt taloja. Aloita painamalla oikealla yläreunassa olevaa \'Lisää Uusi\'-painiketta."
                imageUrl={ErrorImage}
            />
        ),
    
        header: {
            title: 'Talot',
            buttons: [
                {
                    type: 'add',
                    action: (e) => addProperty(e),
                    modalOptions: {
                        headerText: 'Lisää Talo',
                        fields: [
                            {
                                type: 'text',
                                label: 'Osoite',
                                name: 'address',
                            },
    
                            {
                                type: 'textarea',
                                label: 'Kuvaus',
                                name: 'description',
                                sublabel: 'Anna vaihtoehtoinen kuvaus.',
                            }
                        ]
                    }
                }
            ]
        }
    }

    return (
        <Gallery 
            contentSrc={`/api/properties/owner/${session.user.email}`} 
            options={galleryOptions}
        />
    );
}