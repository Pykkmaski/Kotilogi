import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import Error from "kotilogi-app/components/Gallery/Error";
import ErrorImage from 'kotilogi-app/assets/copy.png';
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import getPropertyById from "kotilogi-app/actions/getPropertyById";
import getFilesByPropertyId from "kotilogi-app/actions/getFilesByPropertyId";

export default async function PropertyEventsPage({params}){
    const property = await getPropertyById(params.property_id);
    const files = await getFilesByPropertyId(property.id);

    const options: GalleryOptions = {
        defaultData: {
            property_id: property.id,
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
                    modalOptions: {
                        headerText: 'Lisää Tiedosto',
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
                                label: 'Tiedosto',
                                type: 'file',
                                accept: 'application/pdf',
                                name: 'file',
                            }
                        ]
                    }
                },

                {
                    type: 'delete',
                    modalOptions: {
                        headerText: 'Poista valitut tiedostot',
                        bodyText: 'Haluatko varmasti poistaa valitsemasi tiedostot?',
                        fields: [],
                    },
                }
            ]
        }
    }

    return (
        <Gallery 
            data={files}
            options={options}
        />
    )
}