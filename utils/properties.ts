import db from "kotilogi-app/dbconfig";
import { Files } from "./files";
import { createDueDate } from "./createDueDate";

export class Properties extends Files{
    async addProperty(propertyData: Kotilogi.PropertyType, files?: File[]){
        const trx = await db.transaction();
        try{
            const [{id: propertyId}] = await trx('properties').insert(propertyData, 'id');
            const filePromises = files?.map(file => this.addFile('propertyFiles', file, propertyId, trx));
            await Promise.all(filePromises);

            const bill = {
                amount: 990,
                targetId: propertyId,
                customer: propertyData.refId,
                due: createDueDate(30),
                stamp: 'add_property',
            }

            await trx('bills').insert(bill);
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
            await this.rollbackFiles();
            throw err;
        }
    }

    async deleteProperty(propertyId: string){
        const trx = await db.transaction();
        try{
            //Fetch all file database entries for the property and its events.
            const propertyFileNames = await trx('propertyFiles').where({refId: propertyId}).pluck('fileName') as string[];
            const eventFileNames = await trx('events').where({refId: propertyId}).then(async events => {
                return events.map(async event => await trx('eventFiles').where({refId: event.id}).pluck('fileName'));
            }) as string[];

            const propertyFileDelPromises = propertyFileNames.map(fileName => this.deleteFile('propertyFiles', fileName, trx));
            const eventFileDelPromises = eventFileNames.map(fileName => this.deleteFile('eventFiles', fileName, trx));

            await Promise.all(propertyFileDelPromises);
            await Promise.all(eventFileDelPromises);

            await trx('properties').where({id: propertyId}).del();
            await trx.commit();
        }
        catch(err){
            console.log(err.message);
            await trx.rollback();
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
        try{
            const [{customer}] = await trx('properties').where({id: propertyId}).update({
                status: 'ok',
            }, 'refId');
    
            await trx('bills').insert({
                due: createDueDate(30),
                amount: 4990,
                stamp: 'activate_property',
                tragetId: propertyId,
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