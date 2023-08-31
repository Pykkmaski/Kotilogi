"use server";

import db from "kotilogi-app/dbconfig";

export default async function addEvent(data: FormData): Promise<string | {message: string}>{
    try{
        const insertedIds: object & {id: string}[] = await db('property_events').insert(data, 'id');
        return insertedIds[0].id;
    }
    catch(err){
        return {
            message: err.message,
        }
    }
   
}