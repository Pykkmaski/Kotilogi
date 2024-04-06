'use server';

import db from "kotilogi-app/dbconfig";
import { addWithFiles } from "./addWithFiles";
import { addData } from "./addData";
import { revalidatePath } from "next/cache";
import { createDueDate } from "kotilogi-app/utils/createDueDate";

export async function addEvent(event: Kotilogi.EventType, files?: FormData[]){
    const trx = await db.transaction();
    var result = null;

    try{
        const processedEvent = {
            ...event,
            consolidationTime: createDueDate(7),
        };

        if(files){
            result = await addWithFiles('propertyEvents', processedEvent, files, trx);
        }
        else{
            await addData('propertyEvents', processedEvent, trx);
        }
        
        await trx.commit();
        revalidatePath('/properties/[property_id]/events');
    }
    catch(err){
        await trx.rollback();
        throw err;
    }
}