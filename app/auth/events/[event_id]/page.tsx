
import db from 'kotilogi-app/dbconfig';
import style from './style.module.scss';
import GalleryArea from './GalleryArea';
import EditForm from './EditForm';
import { EventContextProvider } from './EventContext';

export default async function EventPage({params}){

    const event = await db('propertyEvents').where({id: params.event_id}).first();
    if(!event) throw new Error('Failed to load event ' + params.event_id + '!');

    const property = await db('properties').where({id: event.refId}).first();
    if(!property) throw new Error('Failed to load ref property for event ' + params.event_id + '!');

    return (
        <section className={style.page}>
            <EventContextProvider contextValue={{event, property}}>
                <EditForm/>
                <GalleryArea/>
            </EventContextProvider>
        </section>
    )
}