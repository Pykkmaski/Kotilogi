'use server';

import db from "kotilogi-app/dbconfig";
import { deleteFiles } from "../file/deleteFiles";
import { revalidatePath } from "next/cache";
import { PropertyEventError } from "kotilogi-app/utils/error";
import { deleteData } from "../data/deleteData";

/**Checks if an event passes all requirements for deletion and returns and error code.
 * Refer to PropertyEventError for details on the returned codes.
 */
function verifyEventDeletion(event: {consolidationTime: string}): PropertyEventError{
    if(Date.now() >= parseInt(event.consolidationTime)){
        return 'consolidated';
    }

    return 'success';
}

/**
 * Deletes an event and all its files from disk.
 * @param eventId 
 * @returns 
 */
export async function deletePropertyEvent(event: Kotilogi.EventType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const code = verifyEventDeletion(event);
            if(code !== 'success') throw new Error(code);
            
            await deleteData('propertyEvents', event.id);
            revalidatePath('/properties/[property_id]/events');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}