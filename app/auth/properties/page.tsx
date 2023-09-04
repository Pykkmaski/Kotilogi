import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import {getPropertiesByOwner } from 'kotilogi-app/actions/serverGetData';
import Error from "kotilogi-app/components/Gallery/Error";
import Gallery from 'kotilogi-app/components/Gallery/Gallery';
import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import ErrorImage from 'kotilogi-app/assets/house.png';
import { PropertyType } from "kotilogi-app/types/PropertyType";

type SessionType = {
    user: {
        email: string
    },
} | null;

export default async function PropertiesPage({params}){
    const session: SessionType = await getServerSession(options);
    const properties: PropertyType[] | null = await getPropertiesByOwner(session!.user.email);

    const galleryOptions: GalleryOptions = {
        defaultData: {
            owner: session!.user.email,
        } as PropertyType,

        contentTarget: 'properties',
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
                },

                {
                    type: 'delete',
                    modalOptions: {
                        headerText: 'Poista valitut talot',
                        bodyText: 'Haluatko varmasti poistaa valitsemasi talot?',
                        fields: [],
                    },
                }
            ]
        }
    }

    return (
        <Gallery
            options={galleryOptions}
            data={properties!}
        />
    );
}