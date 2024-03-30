'use server';

import { revalidatePath } from 'next/cache';
import * as database from './database';
import * as file from './file';
import db from 'kotilogi-app/dbconfig';
import { unlink } from 'fs/promises';
import { uploadPath } from 'kotilogi-app/uploadsConfig';

/**Generates a consolidation time from the current date + the consolidation delay environment variable. */
function generateConsolidationTime(){
    const consolidationDelay = process.env.EVENT_CONSOLIDATION_TIME;
    if(!consolidationDelay) throw new Error('generateConsolidationTime: EVENT_CONSOLIDATION_TIME environment variable is missing!');

    return Date.now() + parseInt(consolidationDelay);
}

type VerifyEventResultType = 'valid' | 'invalid_date';

function verifyEvent(eventData: Kotilogi.EventType){
    const eventTime = new Date(eventData.time).getTime();
    const currentTime = Date.now();

    if(eventTime > currentTime){
        return 'invalid_date';
    }
    else{
        return 'valid';
    }
}

export async function add(eventData: Kotilogi.EventType, files?: FormData[]){
    const trx = await db.transaction();
    let fileUploadResults: PromiseSettledResult<any>[] = [];
    let rollbackUpload: () => Promise<void> | null = null;

    try{
        //Add the data into the database.
        const [{id: addedEventId}] = await trx('propertyEvents').insert(eventData, 'id') as {id: string}[];

        //Upload the files.
        let addedFileData: Kotilogi.FileType[] = [];
        [addedFileData, rollbackUpload] = await file.upload(files);

        //Insert the file data
        for(const fileData of addedFileData){
            await trx('eventFiles').insert({
                ...fileData,
                refId: addedEventId,
            });
        }

        await trx.commit();
        revalidatePath('/properties/[property_id]/events');
    }
    catch(err){
        console.log(err.message);

        if(rollbackUpload){
            await rollbackUpload();
        }

        await trx.rollback();
        throw err;
    }
}

/**Checks if an event passes all requirements for deletion and returns and error code.
 * Refer to PropertyEventError for details on the returned codes.
 */
function verifyEventDeletion(event: {consolidationTime: string}){
    if(Date.now() >= parseInt(event.consolidationTime)){
        return 'consolidated';
    }

    return 'success';
}

/**
 * Deletes an event and all its files from disk.
 * @param eventId 
 * @returns 
 */
export async function del(data: Kotilogi.EventType){
    const trx = await db.transaction();
    let rollbackDelete: () => Promise<void> | null = null;

    try{
        const ok = verifyEventDeletion(data);
        if(!ok) throw new Error('Event deletion prohibited!');

        const fileData = await trx('eventFiles').where({refId: data.id});
        rollbackDelete = await file.del(fileData);

        await trx('propertyEvents').where({id: data.id}).del();
        await trx.commit();

        revalidatePath('/properties/[property_id]/events');
    }
    catch(err){
        console.log(err.message);

        if(rollbackDelete){
            await rollbackDelete();
        }

        await trx.rollback();
        throw err;
    }
}

export async function uploadFile(fileData: FormData, refId: string){
    const trx = await db.transaction();
    let uploadedFileData: Kotilogi.FileType | null = null;
    let rollbackUpload: () => Promise<void> | null;

    try{
        [[uploadedFileData], rollbackUpload] = await file.upload([fileData]);

        await trx('eventFiles').insert({
            ...uploadedFileData,
            refId,
        });

        revalidatePath('/events/[event_id]/files');
        revalidatePath('/events/[event_id]/images');

        await trx.commit();
    }
    catch(err){
        console.log(err.message);

        if(rollbackUpload){
            try{
                await rollbackUpload();
            }
            catch(err){
                console.log('Upload rollback failed!');
            }
        }

        await trx.rollback();
        throw err;
    }
}

export async function deleteFile(fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        let rollbackDelete: () => Promise<void>;
        const trx = await db.transaction();

        try{
            rollbackDelete = await file.del([fileData]);
            await trx('eventFiles').where({id: fileData.id}).del();
            await trx.commit();

            revalidatePath('/events/[event_id]/files');
            revalidatePath('/events/[events_id]/images');
            resolve();
        }
        catch(err){
            try{
                if(rollbackDelete){
                    await rollbackDelete();
                }

                await trx.rollback();
               
            }
            catch(err){
                console.log(err.message);
            }
            
            reject(err);
        }
    });
}

