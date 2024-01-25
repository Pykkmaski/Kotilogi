'use server';

import db from "kotilogi-app/dbconfig";
import { logError } from "kotilogi-app/utils/logError";

/**
 * Checks if an image is the main image of a ref target.
 * @param imageId The id of the image to check.
 * @param refId The id of the target having a main image.
 * @param refTableName The name of the table where the target is located.
 * @returns 
 */

export async function isMainImage(imageId: Kotilogi.IdType, refId: Kotilogi.IdType, refTableName: 'properties' | 'propertyEvents' | null){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            if(refTableName === null) throw new Error('isMainImage: refTableName cannot be null!');
    
            const refMainImageId = await db(refTableName).where({id: refId}).select('mainImageId').first();
            if(!refMainImageId) throw new Error('serverImageIsMainImage: ' + 'could not find ref with id ' + refId + '!');
            resolve(imageId === refMainImageId);
        }
        catch(err){
            logError(err);
            reject(err);
        }
    })
    
}