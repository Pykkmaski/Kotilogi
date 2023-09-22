import Form from "kotilogi-app/components/Form";
import Modal from "kotilogi-app/components/Modals/Modal";
import db from "kotilogi-app/dbconfig";

export default async function EventInfoPage({params}){
    const event  = await db('propertyEvents').where({id: params.event_id}).first();

    return (
        <section>
            <h2>{event.createdAt}</h2>
            <p>
                {event.description}
            </p>
        </section>
    );
}