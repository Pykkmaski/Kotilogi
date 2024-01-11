'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { upload } from "../file/upload";

function addConsolidationTime(eventData: Kotilogi.EventType){
    const consolidationEnvVar = process.env.EVENT_CONSOLIDATION_TIME;
    const consolidationTime = consolidationEnvVar || '0';

    return {
        ...eventData,
        consolidationTime: Date.now() + consolidationTime,
    }
}

export async function addPropertyEvent(eventData: Kotilogi.EventType, files?: FormData[]){
    return new Promise<Kotilogi.EventType>(async (resolve, reject) => {
        try{
            const processedData = addConsolidationTime(eventData);
            const newEventData = await db('propertyEvents').insert(processedData, '*') as Kotilogi.EventType;

            if(files){
                console.log(newEventData.id);
                await upload(files, newEventData.id, 'eventFiles');
            }

            revalidatePath('/properties/[property_id]/events');
            resolve(newEventData);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}