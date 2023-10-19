'use server';

import db from "kotilogi-app/dbconfig";

export default async function isMainImage(imageId: Kotilogi.IdType, refId: Kotilogi.IdType, tableName: 'properties' | 'propertyEvents'): Promise<boolean>{
    /**
     * Checks if an image is the main image of a target, either a property or an event.
     * @param {Kotilogi.IdType} imageId The id of the image.
     * @param {Kotilogi.IdType} refId The id of the target.
     * @param {string} tableName The name of the table to check, wither properties or propertyEvents.
     * @returns {boolean} True if the image is the main image, false if not, or if an error occurs.
     */
    try{
        const target = await db(tableName).where({id: refId, mainImageId: imageId}).first();
        if(!target) return false;

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}