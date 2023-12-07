'use server';

import db from "kotilogi-app/dbconfig";

/**
 * Checks if an image is the main image of a ref target.
 * @param imageId The id of the image to check.
 * @param refId The id of the target having a main image.
 * @param refTableName The name of the table where the target is located.
 * @returns 
 */

export default async function serverImageIsMainImage(imageId: Kotilogi.IdType, refId: Kotilogi.IdType, refTableName: 'properties' | 'propertyEvents' | null): Promise<boolean | null>{
    try{
        if(refTableName === null) throw new Error('serverImageIsMainImage: refTableName cannot be null!');

        const refMainImageId = await db(refTableName).where({id: refId}).select('mainImageId').first();
        if(!refMainImageId) throw new Error('serverImageIsMainImage: ' + 'could not find ref with id ' + refId + '!');
        return imageId === refMainImageId;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}