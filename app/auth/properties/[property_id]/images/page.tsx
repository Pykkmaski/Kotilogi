import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import Error from "kotilogi-app/components/Gallery/Error";
import ErrorImage from 'kotilogi-app/assets/image.png';
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import getPropertyById from "kotilogi-app/actions/getPropertyById";
import getImagesByPropertyId from "kotilogi-app/actions/getImagesByPropertyId";

export default async function PropertyEventsPage({params}){
    const property = await getPropertyById(params.property_id);
    const images = await getImagesByPropertyId(property.id);

    const options: GalleryOptions = {
        defaultData: {
            property_id: property.id,
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
                    modalOptions: {
                        headerText: 'Lisää Kuva',
                        fields: [
                            {
                                label: 'Otsikko',
                                type: 'text',
                                name: 'name',
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
            data={images}
            options={options}
        />
    )
}