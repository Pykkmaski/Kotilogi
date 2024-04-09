import db from "kotilogi-app/dbconfig";
import { Files } from "./files";
import { createDueDate } from "./createDueDate";
import { DatabaseTable } from "./databaseTable";

export class Properties{
    async addProperty(propertyData: Kotilogi.PropertyType, files?: File[]){
        const trx = await db.transaction();
        const propertiesTable = new DatabaseTable('properties', trx);
        const filesTable = new Files('propertyFiles', trx);

        try{
            const [{id: propertyId}] = await propertiesTable.add(propertyData, 'id');
            const filePromises = files?.map(file => filesTable.addFile(file, propertyId));
            await Promise.all(filePromises);

            const bill = {
                amount: 990,
                targetId: propertyId,
                customer: propertyData.refId,
                due: createDueDate(30),
                stamp: 'add_property',
            }

            await new DatabaseTable('bills', trx).add(bill);
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            await filesTable.rollbackFiles();
            throw err;
        }
    }

    async updateProperty(propertyId: string, newPropertyData: Partial<Kotilogi.PropertyType>){
        const propertiesTable = new DatabaseTable('properties');
        await propertiesTable.update(newPropertyData, {id: propertyId});
    }

    async deleteProperty(propertyId: string){
        const trx = await db.transaction();
        const propertiesTable = new DatabaseTable('properties', trx);
        const propertyFilesTable = new Files('propertyFiles', trx);
        const eventsTable = new DatabaseTable('propertyEvents', trx);
        const eventFilesTable = new Files('eventFiles', trx);

        try{
            //Fetch all file database entries for the property and its events.
            const propertyFileIds = await propertyFilesTable.pluck('id', {refId: propertyId}) as string[];
            const eventFileIds = await eventsTable.get({refId: propertyId}).then(async events => {
                return events.map(async event => await eventFilesTable.pluck('id', {refId: event.id}));
            }) as string[];

            const propertyFileDelPromises = propertyFileIds.map(id => propertyFilesTable.deleteFile(id));
            const eventFileDelPromises = eventFileIds.map(id => eventFilesTable.deleteFile(id));

            await Promise.all(propertyFileDelPromises);
            await Promise.all(eventFileDelPromises);

            await trx('properties').where({id: propertyId}).del();
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            const promises = [trx.rollback, propertyFilesTable.rollbackFiles, eventFilesTable.rollbackFiles];
            await Promise.all(promises)
            .catch(err => console.log('Property rollback failed to complete!'));

            throw err;
        }
    }

    async deactivateProperty(propertyId: string){
        await db('properties').where({id: propertyId}).update({
            status: 'deactivated',
        });
    }

    async activateProperty(propertyId: string){
        const trx = await db.transaction();
        const propertiesTable = new DatabaseTable('properties', trx);
        const billsTable = new DatabaseTable('bills', trx);

        try{
            const [{refId: customer}] = await propertiesTable.update({
                status: 'ok',
            }, {id: propertyId}, 'refId');
    
            await billsTable.add({
                due: createDueDate(30),
                amount: 4990,
                stamp: 'activate_property',
                targetId: propertyId,
                customer,
            });
    
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            throw err;
        }
    }
}