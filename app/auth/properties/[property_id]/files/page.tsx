import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import Error from "kotilogi-app/components/Gallery/Error";
import ErrorImage from 'kotilogi-app/assets/copy.png';
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import { serverGetDataById, serverGetDataByPropertyId } from "kotilogi-app/actions/serverGetData";
import { PropertyType } from "kotilogi-app/types/PropertyType";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";
import { PropertyFileType } from "kotilogi-app/types/PropertyFileType";

export default async function PropertyEventsPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as PropertyType | null;
    throwErrorIfNull(property, 'Talon lataaminen epäonnistui!');

    const files = await serverGetDataByPropertyId(property!.id, 'property_files') as PropertyFileType[] | null;
    throwErrorIfNull(files, 'Tiedostojen lataaminen epäonnistui!');
    

    const options: GalleryOptions = {
        defaultData: {
            property_id: property!.id,
        },

        contentTarget: 'property_files',
        contentError: (
            <Error
                title="Ei Tiedostoja"
                message="Et ole vielä lisännyt talolle tiedostoja."
                imageUrl={ErrorImage}
            />
        ),

        header: {
            title: property!.address,
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
                                name: 'title',
                                required: true,
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
                                required: true,
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
            data={files!}
            options={options}
        />
    )
}