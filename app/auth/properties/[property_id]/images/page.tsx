import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import Error from "kotilogi-app/components/Gallery/Error";
import ErrorImage from 'kotilogi-app/assets/image.png';
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import { serverGetDataById, serverGetDataByPropertyId } from "kotilogi-app/actions/serverGetData";
import { PropertyType } from "kotilogi-app/types/PropertyType";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import { PropertyImageType } from "kotilogi-app/types/PropertyImageType";
import { PropertyFileType } from "kotilogi-app/types/PropertyFileType";

export default async function PropertyEventsPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as PropertyType | null;
    throwErrorIfNull(property, 'Talon lataaminen epäonnistui!');

    const images = await serverGetDataByPropertyId(property!.id, 'property_images') as PropertyImageType[] | null;
    throwErrorIfNull(images, 'Kuvien lataaminen epäonnistui!');

    const options: GalleryOptions = {
        defaultData: {
            property_id: property!.id,
        },

        contentTarget: 'property_files',
        contentError: (
            <Error
                title="Ei Kuvia"
                message="Et ole vielä lisännyt talolle kuvia."
                imageUrl={ErrorImage}
            />
        ),

        header: {
            title: property!.address,
            subtitle: 'Kuvat',
            buttons: [
                {
                    type: 'add',
                    modalOptions: {
                        headerText: 'Lisää Kuva',
                        fields: [
                            {
                                label: 'Otsikko',
                                type: 'text',
                                name: 'title',
                            },

                            {
                                label: 'Kuvaus',
                                type: 'textarea',
                                name: 'description',
                                sublabel: 'Anna vaihtoehtoinen kuvaus',
                            },

                            {
                                label: 'Kuva',
                                type: 'file',
                                accept: 'image/jpeg',
                                name: 'image',
                            }
                        ]
                    }
                },

                {
                    type: 'delete',
                    modalOptions: {
                        headerText: 'Poista valitut kuvat',
                        bodyText: 'Haluatko varmasti poistaa valitsemasi kuvat?',
                        fields: [],
                    },
                }
            ]
        }
    }

    return (
        <Gallery 
            data={images!}
            options={options}
        />
    )
}