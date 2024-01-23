'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

export async function addUsageData(usageData: Kotilogi.UsageType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await db('usage').insert(usageData);
            revalidatePath('/properties/[property_id]/usage');
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}