'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { updateDataById } from "../data/updateData";

export async function updateProperty(propertyId: Kotilogi.IdType, newPropertyData: Kotilogi.PropertyType){
    return new Promise<Kotilogi.PropertyType>(async (resolve, reject) => {
        try{
            const updatedProperty = await updateDataById(newPropertyData, propertyId, 'properties') as Kotilogi.PropertyType;
            resolve(updatedProperty);
        }
        catch(err){
            reject(err);
        }
    });
}