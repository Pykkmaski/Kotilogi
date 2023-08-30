import db from "kotilogi-app/dbconfig";

export default async function getEventsByPropertyId(property_id: number){
    return await db('property_events').where({property_id}).orderBy('date', 'desc');
}