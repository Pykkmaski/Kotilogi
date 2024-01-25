'use server';

import db from "kotilogi-app/dbconfig"
import { revalidatePath } from "next/cache";

export async function deleteUsage(usageData: Kotilogi.UsageType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await db('usage').where({id: usageData.id}).del();
            revalidatePath('/properties/[property_id]/usage');
            resolve();
        }
        catch(err){
            reject(err);
        }
    })
}