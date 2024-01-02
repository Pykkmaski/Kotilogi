'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

export async function updatePropertyEvent(newEventData: any){
    return new Promise<object>(async (resolve, reject) => {
        try{
            const updatedData = await db('propertyEvents').where({id: newEventData.id}).update(newEventData);
            revalidatePath('/events/[event_id]');
            resolve(updatedData[0]);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}