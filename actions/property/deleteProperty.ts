'use server';

import { revalidatePath } from "next/cache";
import { deleteData } from "../data/deleteData";

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