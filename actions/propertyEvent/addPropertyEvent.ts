'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { upload } from "../file/upload";
import { addData } from "../data/addData";

function addConsolidationTime(eventData: Kotilogi.EventType){
    const consolidationEnvVar = process.env.EVENT_CONSOLIDATION_TIME;
    const consolidationTime = consolidationEnvVar || '0';

    return {
        ...eventData,
        consolidationTime: Date.now() + consolidationTime,
    }
}

export async function addPropertyEvent(eventData: Kotilogi.EventType, files?: FormData[]){
    var addedEvent: Kotilogi.EventType | null = null;

    return new Promise<Kotilogi.EventType>(async (resolve, reject) => {
        try{
            const processedData = addConsolidationTime(eventData);
            addedEvent = await addData<Kotilogi.EventType>('propertyEvents', processedData, files);
            revalidatePath('/properties/[property_id]/events');
            resolve(addedEvent);
        }
        catch(err){
            console.log(err.message);
            if(addedEvent){
                //Clean up the event if it was added.
                await db('propertyEvents').where({id: addedEvent.id}).del();
            }
            reject(err);
        }
    });
}