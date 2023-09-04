import { GalleryOptions } from "kotilogi-app/components/Gallery/Types";
import GalleryError from "kotilogi-app/components/Gallery/Error";
import ErrorImage from 'kotilogi-app/assets/history.png';
import Gallery from "kotilogi-app/components/Gallery/Gallery";
import { serverGetDataById, serverGetDataByPropertyId } from "kotilogi-app/actions/serverGetData";
import { PropertyType } from "kotilogi-app/types/PropertyType";
import { EventType } from "kotilogi-app/types/EventType";
import { throwErrorIfNull } from "kotilogi-app/utils/throwErrorIfNull";

export default async function PropertyEventsPage({params}){
    const property = await serverGetDataById(params.property_id, 'properties') as PropertyType | null;
    throwErrorIfNull(property, 'Virhe ladattaessa taloa!');

    const events= await serverGetDataByPropertyId(property!.id, 'property_events') as EventType[] | null;
    throwErrorIfNull(events, 'Virhe ladattaessa tapahtumia!');

    const options: GalleryOptions = {
        defaultData: {
            property_id: property!.id,
        },

        contentTarget: 'property_events',
        contentError: (
            <GalleryError
                title="Ei Tapahtumia"
                message="Et ole vielä lisännyt talolle tapahtumia."
                imageUrl={ErrorImage}
            />
        ),

        header: {
            title: property!.address,
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
            data={events!}
            options={options}
        />
    )

}