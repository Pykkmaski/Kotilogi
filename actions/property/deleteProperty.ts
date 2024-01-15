'use server';

import { revalidatePath } from "next/cache";
import { deleteData } from "../data/deleteData";

export async function deleteProperty(propertyId: Kotilogi.IdType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await deleteData('properties', propertyId);
            revalidatePath('/properties');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}