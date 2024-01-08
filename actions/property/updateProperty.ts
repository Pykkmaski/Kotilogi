'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

export async function updateProperty(propertyId: Kotilogi.IdType, newPropertyData: Kotilogi.PropertyType){
    return new Promise<Kotilogi.PropertyType>(async (resolve, reject) => {
        try{
            const updatedProperty = await db('properties').where({id: propertyId}).update(newPropertyData, '*') as Kotilogi.PropertyType;
            revalidatePath('/properties/[property_id]/info');
            resolve(updatedProperty);
        }
        catch(err){
            reject(err);
        }
    });
}