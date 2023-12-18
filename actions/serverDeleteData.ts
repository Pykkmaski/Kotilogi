'use server';

import db from "kotilogi-app/dbconfig";
import {unlink} from 'fs/promises';
import { uploadPath } from "kotilogi-app/uploadsConfig";
import upload from "./upload";

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
        console.log(err.message);
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
        return ErrorCode.SUCCESS;
    }
    catch(err){
        console.log(err.message);
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
        console.log(err.message);
        return ErrorCode.UNEXPECTED;
    }
}

/**
 * Deletes the event data from the database and all its associated files.
 * @param eventId 
 * @returns 
 */
async function handleEventDeletion(eventId: Kotilogi.IdType): Promise<number>{
    try{
        //Delete the actual files on disk.
        const fileNames = await db('eventFiles').where({refId: eventId}).pluck('fileName');
        for(const fileName of fileNames){
            await unlink(uploadPath + fileName);
        }

        //Delete the event data.
        await db('propertyEvents').where({id: eventId}).del();
        
        return ErrorCode.SUCCESS;
    }
    catch(err){
        console.log(err.message);
        return ErrorCode.UNEXPECTED;
    }
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
        console.log(err.message);
        return ErrorCode.UNEXPECTED;
    }
}

/**
 * Deletes a single entry on a database table. Also automatically deletes any associated files.
 * @param id 
 * @param tableName 
 */

export default async function serverDeleteData(id: Kotilogi.IdType, tableName: Kotilogi.Table): Promise<number>{
    switch(tableName){
        case 'properties':      
            return await handlePropertyDeletion(id);

        case 'propertyEvents':
            return await handleEventDeletion(id);
            
        case 'files':
            return await handleFileDeletion(id);

        default: return await handleDeletion(id, tableName);
    }
}