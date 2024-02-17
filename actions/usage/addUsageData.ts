'use server';

import db from "kotilogi-app/dbconfig";
import { logError } from "kotilogi-app/utils/logError";
import { revalidatePath } from "next/cache";

/**
 * @deprecated
 * @param usageData 
 * @returns 
 */
export async function addUsageData(usageData: Kotilogi.UsageType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await db('usage').insert(usageData);
            revalidatePath('/properties/[property_id]/usage');
            resolve();
        }
        catch(err){
            logError(err);
            reject(err);
        }
    });
}