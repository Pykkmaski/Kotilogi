'use server';

import db from "kotilogi-app/dbconfig";
import isAllowedToAddProperty from "kotilogi-app/utils/isAllowedToAddProperty";
import { revalidatePath } from "next/cache";

export async function addProperty(propertyData: any){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const ok = await isAllowedToAddProperty(propertyData.refId);
            if(!ok) return reject('not_allowed');
            await db('properties').insert(propertyData);
            revalidatePath('/properties');
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}