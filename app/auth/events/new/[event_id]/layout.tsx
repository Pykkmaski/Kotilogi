import style from './layout.module.scss';
import HeaderSection from './_components/HeaderSection';
import db from 'kotilogi-app/dbconfig';
import NavBar from './_components/NavBar';
import EventContextProvider from './_util/EventContextProvider';

export default async function Layout({children, params}){
    const event = await db('propertyEvents').where({id: params.event_id}).first();
    if(!event) throw new Error('Failed to load event!');

    const contextValue = {
        event,
    }

    return (
        <EventContextProvider value={contextValue}>
            <HeaderSection eventId={params.event_id}/>
            <section className={style.bodySection}>
                <NavBar/>
                {children}
            </section>
        </EventContextProvider>
    )
}