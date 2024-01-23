'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

export async function updateUsage(usageData: Kotilogi.UsageType){
    return new Promise<void>(async (reject, resolve) => {
        try{
            await db('usage').where({id: usageData.id}).update(usageData);
            revalidatePath('/properties/[property_id]/usage');
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}