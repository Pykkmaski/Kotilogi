import db from "kotilogi-app/dbconfig";
import { Files } from "./files";
import { createDueDate } from "./createDueDate";

export class Events extends Files{
    private verifyDeletion(consolidationTime: number){
        const currentDate = Date.now();
        if(currentDate > consolidationTime){
            throw new Error('event_consolidated');
        }
    }

    async addEvent(eventData: Kotilogi.EventType, files?: File[]){
        const trx = await db.transaction();
        try{
            const [{id: eventId}] = await trx('propertyEvents').insert({
                ...eventData,
                consolidationTime: createDueDate(7),
            }, 'id');

            console.log(eventId);
            const filePromises = files?.map(file => this.addFile('eventFiles', file, eventId, trx));
            await Promise.all(filePromises);
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            await this.rollbackFiles();
            throw err;
        }
    }

    async deleteEvent(eventId: string){
        const trx = await db.transaction();
        try{
            const [{consolidationTime}] = await trx('propertyEvents').where({id: eventId}).select('consolidationTime');
            this.verifyDeletion(consolidationTime);

            const fileNames = await trx('eventFiles').where({refId: eventId}).pluck('fileName') as string[];
            const fileDelPromises = fileNames.map(fileName => this.deleteFile('eventFiles', fileName, trx));
            await Promise.all(fileDelPromises);

            await trx('propertyEvents').where({id: eventId}).del();
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            await this.rollbackFiles();
        }
    }
}