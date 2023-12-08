import Gallery from "kotilogi-app/components/Experimental/Gallery/Gallery";
import EventsGallery from "kotilogi-app/components/new/Gallery/EventsGallery/EventsGallery";
import db from "kotilogi-app/dbconfig";
import style from './style.module.scss';

function ItemElement({item}){
    return (
        <div className={style.itemElement}>
            <span>{item.title}</span>
        </div>
    );
}

export default async function EventsPage({params}){
    const eventData = await db('propertyEvents').where({refId: params.property_id});

    return(
        <EventsGallery propertyId={params.property_id} propertyAddress=""/>
    );
}