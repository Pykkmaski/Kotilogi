'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { addData } from "../data/addData";
import { generateConsolidationTime } from "./util/generateConsolidationTime";
import { logError } from "kotilogi-app/utils/logError";

export async function addPropertyEvent(eventData: Kotilogi.EventType, files?: FormData[]){
    var addedEvent: Kotilogi.EventType | null = null;

    return new Promise<Kotilogi.EventType>(async (resolve, reject) => {
        try{
            const processedData: Kotilogi.EventType = {
                ...eventData,
                consolidationTime: generateConsolidationTime().toString(),
            };

            addedEvent = await addData<Kotilogi.EventType>('propertyEvents', processedData, files);
            revalidatePath('/properties/[property_id]/events');
            resolve(addedEvent);
        }
        catch(err){
            logError(err);
            if(addedEvent){
                //Clean up the event if it was added.
                await db('propertyEvents').where({id: addedEvent.id}).del();
            }
            reject(err);
        }
    });
}