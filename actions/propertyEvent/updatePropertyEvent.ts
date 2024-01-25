'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { generateConsolidationTime } from "./util/generateConsolidationTime";
import { logError } from "kotilogi-app/utils/logError";

/**Updates a saved event entry. Will reset the consolidation time. */
export async function updatePropertyEvent(eventId: Kotilogi.IdType, newEventData: any){
    return new Promise<object>(async (resolve, reject) => {
        try{
            const updatedData = await db('propertyEvents').where({id: eventId}).update({
                ...newEventData,
                consolidationTime: generateConsolidationTime(),
            });

            revalidatePath('/events/[event_id]/info');
            resolve(updatedData[0]);
        }
        catch(err){
            logError(err);
            reject(err);
        }
    });
}