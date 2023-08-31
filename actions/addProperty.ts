"use server"

import db from "kotilogi-app/dbconfig";

export default async function addProperty(data: FormData): Promise<string | {message: string}>{
    try{
        const insertedIds: object & {id: string}[] = await db('properties').insert(data, 'id');
        return insertedIds[0].id;
    }
    catch(err){
        return {
            message: err.message,
        }
    }
    
}