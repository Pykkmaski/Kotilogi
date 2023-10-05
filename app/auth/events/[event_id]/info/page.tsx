import db from "kotilogi-app/dbconfig";
import EventInfo from "./EventInfo";

export default async function EventInfoPage({params}){
    const event  = await db('propertyEvents').where({id: params.event_id}).first() as Kotilogi.EventType;

    return (
        <>
            <EventInfo event={event}/>
        </>
    );
}