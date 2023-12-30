'use server';

import db from "kotilogi-app/dbconfig";

const ErrorCode = {
    SUCCESS: 0,
    UNEXPECTED: 1,
}

/**
 * Sets an image as the main image of an object.
 * @param imageId The id of the image.
 * @param refId The id of the object this image belongs to
 * @param refType The type of the ref object. Either property or event.
 */
export default async function setMainImage(imageId: Kotilogi.IdType, refId: Kotilogi.IdType, tableName: 'properties' | 'propertyEvents'){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await db(tableName).where({id: refId}).update({mainImageId: imageId});
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err.message);
        }
    });
}