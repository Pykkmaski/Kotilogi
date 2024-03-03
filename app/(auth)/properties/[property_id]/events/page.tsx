import db from "kotilogi-app/dbconfig";
import { Content } from "./page.components";
import { ContentCard, RoundedBox } from "@/components/RoundedBox/RoundedBox";

const eventsPerPage = 10;

async function getEvents(propertyId: string, q: string | undefined, page?: number){
    const query = `%${q}%`;
    const events: Kotilogi.EventType[] = await db('propertyEvents')
    .andWhereLike('time', query)
    .orWhereLike('title', query)
    .orWhereLike('description', query)
    .andWhere({refId: propertyId})
    .orderBy('time', 'desc');

    return events;
}

export default async function EventsPage({params, searchParams}){
    const events = await getEvents(params.property_id, searchParams.q, searchParams.page);

    return (
        <main>
            <Content events={events} propertyId={params.property_id}/>       
        </main>
    );
}