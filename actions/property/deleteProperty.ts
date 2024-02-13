'use server';

import { revalidatePath } from "next/cache";
import { deleteData } from "../data/deleteData";

/**
 * @deprecated This method has been replaced by the del-method in the actions/properties module.
 * @param property 
 * @returns 
 */
export async function deleteProperty(property: Kotilogi.PropertyType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await deleteData('properties', property.id);
            revalidatePath('/properties');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}