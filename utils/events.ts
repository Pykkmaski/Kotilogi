import db from "kotilogi-app/dbconfig";
import { Files } from "./files";
import { createDueDate } from "./createDueDate";
import { DatabaseTable } from "./databaseTable";

export class Events{
    private verifyEdit(consolidationTime: number){
        const currentDate = Date.now();
        if(currentDate > consolidationTime){
            throw new Error('event_consolidated');
        }
    }

    async addEvent(eventData: Kotilogi.EventType, files?: File[]){
        const trx = await db.transaction();
        const eventsTable = new DatabaseTable('propertyEvents', trx);
        const eventFilesTable = new Files('eventFiles', trx);

        try{
            const [{id: eventId}] = await eventsTable.add({
                ...eventData,
                consolidationTime: createDueDate(7),
            }, 'id');

            const filePromises = files?.map(file => eventFilesTable.addFile(file, eventId));
            await Promise.all(filePromises);
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            await eventFilesTable.rollbackFiles();
            throw err;
        }
    }

    async deleteEvent(eventId: string){
        const trx = await db.transaction();
        const eventsTable = new DatabaseTable('propertyEvents', trx);
        const eventFilesTable = new Files('eventFiles', trx);

        try{
            const [{consolidationTime}] = await eventsTable.select(['consolidationTime'], {id: eventId});
            this.verifyEdit(consolidationTime);

            const fileNames = await trx('eventFiles').where({refId: eventId}).pluck('id') as string[];
            const fileDelPromises = fileNames.map(id => eventFilesTable.deleteFile(id));
            await Promise.all(fileDelPromises);

            await eventsTable.del({id:  eventId});
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            await eventFilesTable.rollbackFiles();
        }
    }

    async updateEvent(eventId: string, newEventData: Partial<Kotilogi.EventType>){
        const table = new DatabaseTable('propertyEvents');
        const [{consolidationTime}] = await table.select('consolidationTime', {id: eventId});
        this.verifyEdit(consolidationTime);

        console.log(eventId);
        await table.update(newEventData, {id: eventId});
    }
}