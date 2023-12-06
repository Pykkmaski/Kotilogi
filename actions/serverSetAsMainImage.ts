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
export default async function serverSetAsMainImage(imageId: Kotilogi.IdType, refId: Kotilogi.IdType, refType: 'property' | 'event' | null): Promise<number>{
    try{
        switch(refType){
            case 'property':{
                await db('properties').where({id: refId}).update({mainImageId: imageId});
            }
            break;

            case 'event':{
                await db('propertyEvents').where({id: refId}).update({mainIMageId: imageId});
            }
            break;

            default: throw new Error('serverSetAsMainImage: Invalid refType! ' + refType);   
        }

        return ErrorCode.SUCCESS;
    }
    catch(err){
        console.log(err.message);
        return ErrorCode.UNEXPECTED;
    }
}