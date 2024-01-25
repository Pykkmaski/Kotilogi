'use server';

import db from "kotilogi-app/dbconfig";
import { logError } from "kotilogi-app/utils/logError";
import { revalidatePath } from "next/cache";

export async function updateUsage(usageData: Kotilogi.UsageType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await db('usage').where({id: usageData.id}).update(usageData);
            revalidatePath('/properties/[property_id]/usage');
            resolve();
        }
        catch(err){
            logError(err);
            reject(err);
        }
    });
}