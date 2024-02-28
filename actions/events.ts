'use server';

import { revalidatePath } from 'next/cache';
import * as database from './database';
import * as file from './file';

/**Generates a consolidation time from the current date + the consolidation delay environment variable. */
function generateConsolidationTime(){
    const consolidationDelay = process.env.EVENT_CONSOLIDATION_TIME;
    if(!consolidationDelay) throw new Error('generateConsolidationTime: EVENT_CONSOLIDATION_TIME environment variable is missing!');

    return Date.now() + parseInt(consolidationDelay);
}

export async function add(eventData: Kotilogi.EventType, files?: FormData[]){
    var addedEvent: Kotilogi.EventType | null = null;

    return new Promise<Kotilogi.EventType>(async (resolve, reject) => {
        try{
            const processedData: Kotilogi.EventType = {
                ...eventData,
                consolidationTime: generateConsolidationTime().toString(),
            };

            addedEvent = await database.addWithFiles('propertyEvents', 'eventFiles', processedData, files);
            revalidatePath('/properties/[property_id]/events');
            resolve(addedEvent);
        }
        catch(err){
            console.log(err.message);
            if(addedEvent){
                //Clean up the event if it was added.
                await database.del('propertyEvents', {id: addedEvent.id}).catch(err => console.log(err.message));
            }
            reject(err);
        }
    });
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

export async function deleteFile(fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await file.del('eventFiles', fileData);
            revalidatePath('/events/[event_id]');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}

