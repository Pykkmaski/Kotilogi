"use server"

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

export default async function addProperty(data: FormData): Promise<string | {message: string}>{
    try{
        const insertedIds: object & {id: string}[] = await db('properties').insert(data, 'id');
        revalidatePath('/auth/properties');
        return insertedIds[0].id;
    }
    catch(err){
        return {
            message: err.message,
        }
    }
    
}