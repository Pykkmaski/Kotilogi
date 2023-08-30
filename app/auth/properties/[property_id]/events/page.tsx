import getEventsByPropertyId from "kotilogi-app/actions/getEventsByPropertyId";
import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import Error from "kotilogi-app/components/Gallery/Error";
import ErrorImage from 'kotilogi-app/assets/history.png';
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import getPropertyById from "kotilogi-app/actions/getPropertyById";

export default async function PropertyEventsPage({params}){
    const property = await getPropertyById(params.property_id);
    const events = await getEventsByPropertyId(property.id);

    const options: GalleryOptions = {
        defaultData: {
            property_id: property.id,
        },

        contentType: 'event',
        contentError: (
            <Error
                title="Ei Tapahtumia"
                message="Et ole vielä lisännyt talolle tapahtumia."
                imageUrl={ErrorImage}
            />
        ),

        header: {
            title: property.address,
            subtitle: 'Tapahtumat',
            buttons: [
                {
                    type: 'add',
                    modalOptions: {
                        headerText: 'Lisää Tapahtuma',
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
                            }
                        ]
                    }
                },

                {
                    type: 'delete',
                    modalOptions: {
                        headerText: 'Poista valitut tapahtumat',
                        bodyText: 'Haluatko varmasti poistaa valitsemasi tapahtumat?',
                        fields: [],
                    },
                }
            ]
        }
    }

    return (
        <Gallery 
            data={events}
            options={options}
        />
    )

}