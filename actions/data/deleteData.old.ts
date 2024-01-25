'use server';

import db from "kotilogi-app/dbconfig";
import {unlink} from 'fs/promises';
import { uploadPath } from "kotilogi-app/uploadsConfig";
import { revalidatePath } from "next/cache";
import { logError } from "kotilogi-app/utils/logError";

const ErrorCode = {
    SUCCESS: 0,
    PROPERTY_NOT_FOUND: 1,
    EVENT_NOT_FOUND: 2,
    FILE_NOT_FOUND: 3,
    UNEXPECTED: 4,
}

/**
 * Deletes the files with the provided filenames from disk.
 * @param fileNames 
 * @returns 
 */
export async function deleteFiles(fileNames: string[]): Promise<number>{
    try{
        for(const fileName of fileNames){
            await unlink(uploadPath + fileName);
        }
        return 0;
    }
    catch(err){
        logError(err);
        return 1;
    }
}

/**
 * Deletes the property entry from the database, all its files, events, and the files of the events the property had associated with itself.
 * @param propertyId The id of the property.
 */
async function handlePropertyDeletion(propertyId: Kotilogi.IdType): Promise<number>{
    try{
        //Delete the files associated with the property.
        const propertyFileNames = await db('propertyFiles').where({refId: propertyId}).pluck('fileName');
        for(const fileName of propertyFileNames){
            await unlink(uploadPath + fileName);
        }

        await db('properties').where({id: propertyId}).del();
        revalidatePath('/properties');
        return ErrorCode.SUCCESS;
    }
    catch(err){
        logError(err);
        return ErrorCode.UNEXPECTED;
    }
}

/**
 * Generic file deletion handler. Only deletes entries from database tables. If an entry may have files associated with it, use the 
 * handleDeletionWithFiles or handleFileDeletion functions.
 * @param id The id of the entry to be deleted.
 * @param tableName The name of the database table holding the entry.
 * @returns Resolves to a number representing an error code. Import the ErrorCode object from this module to check against them.
 */
async function handleDeletion(id: Kotilogi.IdType, tableName: Kotilogi.Table): Promise<number>{
    try{
        await db(tableName).where({id}).del();
        return ErrorCode.SUCCESS;
    }
    catch(err){
        logError(err);
        return ErrorCode.UNEXPECTED;
    }
}

/**
 * Deletes the event data from the database and all its associated files.
 * @param eventId 
 * @returns 
 */
async function handleEventDeletion(eventId: Kotilogi.IdType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            //Prevent deletion of the event if it has been consolidated.
            const eventData = await db('propertyEvents').where({id: eventId}).first().select('consolidationTime');
            if(Date.now() > parseInt(eventData.consolidationTime)) throw new Error('Tapahtuma on liian vanha poistettavaksi!');

            /**The names of the files associated with this event */
            const fileNames = await db('eventFiles').where({refId: eventId}).pluck('fileName');
    
            for(const fileName of fileNames){
                await unlink(uploadPath + fileName);
            }
    
            //Delete the event data. Deletes the file associated db entries as well due to CASCADE.
            await db('propertyEvents').where({id: eventId}).del();
            revalidatePath('/properties/[property_id]/events');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

/**
 * Deletes a single file from the database.
 */
async function handleFileDeletion(fileId: Kotilogi.IdType): Promise<number>{
    try{
        //Delete the file on the disk.
        const fileName = await db('files').where({id: fileId}).select('fileName').first();

        if(!fileName) return ErrorCode.FILE_NOT_FOUND;

        await unlink(uploadPath + fileName);
        await db('files').where({id: fileId}).del();

        return ErrorCode.SUCCESS;
    }
    catch(err){
        logError(err);
        return ErrorCode.UNEXPECTED;
    }
}

/**
 * Deletes a single entry on a database table. Also automatically deletes any associated files.
 * @param id 
 * @param tableName 
 */

export async function deleteData(id: Kotilogi.IdType, tableName: Kotilogi.Table){
    return new Promise<void>(async (resolve, reject) => {
        try{
            switch(tableName){
                case 'properties':      
                    await handlePropertyDeletion(id);
        
                case 'propertyEvents':
                    await handleEventDeletion(id);
                    
                case 'propertyFiles':
                case 'eventFiles':
                    await handleFileDeletion(id);
        
                default: await handleDeletion(id, tableName);
            }

            resolve();
        }
        catch(err){
            logError(err);
            reject(err);
        }
    });
}