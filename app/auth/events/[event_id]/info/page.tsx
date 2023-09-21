import db from "kotilogi-app/dbconfig";

export default async function EventInfoPage({params}){
    const event  = await db('propertyEvents').where({id: params.event_id}).first();

    return (
        <section>
            <h1>{event.title}</h1>
            <h2>{event.createdAt}</h2>
            <p>
                {event.description}
            </p>
        </section>
    );
}