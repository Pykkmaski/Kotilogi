import db from "kotilogi-app/dbconfig";
import { Content, Header } from "./page.components";
import { PageWithDataWrapper } from "kotilogi-app/components/PageWithData/PageWithData";
import { EventListItem } from "kotilogi-app/components/ListItem/ListItem";
import { Gallery } from "kotilogi-app/components/Experimental/Gallery/Gallery";

async function getEvents(propertyId: string, q: string | undefined){
    const events = await db('propertyEvents').where({refId: propertyId}) as Kotilogi.EventType[];

    if(!q) return events;

    const lowerCaseQuery = q.toLowerCase();

    const displayedEvents = q ? events.filter(event => (
        event.title.toLowerCase().includes(lowerCaseQuery)
        ||
        event.description.toLowerCase().includes(lowerCaseQuery)
    )) : events;
    
    return displayedEvents;
}

export default async function EventsPage({params, searchParams}){
    
    const events = await getEvents(params.property_id, searchParams.q);

    return (
        <main>
            <PageWithDataWrapper data={events}>
                <Header/>
                <Gallery<Kotilogi.EventType> data={events} itemComponent={EventListItem}/>
            </PageWithDataWrapper>
        </main>
    );
}