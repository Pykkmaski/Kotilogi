'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

/**Figures out which paths to revalidate based on the passed table name. */
function revalidateByTableName(tablename: string){
    switch(tablename){
        case 'properties':
            revalidatePath('/dashboard/properties');
            revalidatePath('/properties/[property_id]/info');
        break;

        case 'propertyEvents':
            revalidatePath('/events/[event_id]');
            revalidatePath('/properties/[property_id]/events/info');
        break;

        case 'propertyFiles':
            revalidatePath('/properties[property_id]/images');
            revalidatePath('/properties[property_id]/files');
        break;

        case 'eventFiles':
            revalidatePath('events/[event_id]/images');
            revalidatePath('events/[event_id]/files');
        break;
    }
}

/**Generic function to update data in the database. */
export async function updateDataById(newData: object, id: Kotilogi.IdType, tablename: string){
    return new Promise<object>(async (resolve, reject) => {
        try{
            const [updatedData]: [object] = await db(tablename).where({id}).update(newData, '*');
            revalidateByTableName(tablename);
            resolve(updatedData);
        }
        catch(err){
            console.log(err.message);
            reject(err.message);
        }
    });
}