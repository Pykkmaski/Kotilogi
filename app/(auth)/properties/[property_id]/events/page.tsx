import db from "kotilogi-app/dbconfig";
import { Content } from "./page.components";

const eventsPerPage = 10;

async function getEvents(propertyId: string, q: string | undefined, page?: number){
    var events: Kotilogi.EventType[] = await db('propertyEvents').where({refId: propertyId});

    if(!q) return events;

    const lowerCaseQuery = q.toLowerCase();

    const displayedEvents = q ? events.filter(event => (
        event.title.toLowerCase().includes(lowerCaseQuery)
        ||
        event.description?.toLowerCase().includes(lowerCaseQuery)
        ||
        event.createdAt?.includes(q)
    )) : events;
    
    return displayedEvents.sort((a, b) => parseInt(a.time) - parseInt(b.time));
}

export default async function EventsPage({params, searchParams}){
    const events = await getEvents(params.property_id, searchParams.q, searchParams.page);

    return <main><Content events={events} propertyId={params.property_id}/></main>
}