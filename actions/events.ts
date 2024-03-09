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
    var addedEvent: Kotilogi.EventType | null = null;

    try{
        const verifyResult = verifyEvent(eventData);
        if(verifyResult === 'invalid_date'){
            throw new Error('Tapahtuman päiväys ei voi olla tulevaisuudessa!');
        }

        const processedData: Kotilogi.EventType = {
            ...eventData,
            consolidationTime: generateConsolidationTime().toString(),
        };

        addedEvent = await database.addWithFiles('propertyEvents', 'eventFiles', processedData, files);
        revalidatePath('/properties/[property_id]/events');
        return addedEvent;
    }
    catch(err){
        console.log(err.message);
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
export async function del(event: Kotilogi.EventType){
    const code = verifyEventDeletion(event);
    if(code !== 'success') throw new Error(code); 
         
    await database.delWithFiles('propertyEvents', 'eventFiles', event);
    revalidatePath('/properties/[property_id]/events');
}

export async function uploadFile(fileData: FormData, refId: string){
    const trx = await db.transaction();
    let uploadedFileData: Kotilogi.FileType | null = null;

    try{
        uploadedFileData = await file.upload(fileData);
        await trx('propertyFiles').insert({
            ...uploadedFileData,
            refId,
        });

        revalidatePath('/events/[event_id]/files');
        revalidatePath('/events/[event_id]/images');

        await trx.commit();
    }
    catch(err){
        console.log(err.message);

        if(uploadedFileData){
            //Delete the file if it was uploaded.
            try{
                await unlink(uploadPath + uploadedFileData.fileName);
            }
            catch(err){
                console.log(err.message);
                throw err;
            }
        }

        await trx.rollback();
        throw err;
    }
}

export async function deleteFile(fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await file.del('eventFiles', fileData);
            revalidatePath('/events/[event_id]/files');
            revalidatePath('/events/[event_id]/images');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

