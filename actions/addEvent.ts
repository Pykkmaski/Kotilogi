"use server";

import db from "kotilogi-app/dbconfig";

export default async function addEvent(data: FormData){
    const insertedIds = await db('property_events').insert(data, 'id');
    return insertedIds.at(0).id;
}