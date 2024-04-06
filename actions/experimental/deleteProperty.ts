'use server';

import db from "kotilogi-app/dbconfig";
import { deleteData } from "./deleteData";
import { deleteWithFiles } from "./deleteWithFiles";
import { revalidatePath } from "next/cache";
import { deleteMultiple } from "./deleteFile";
import { deleteEvent } from "./deleteEvent";

export async function deleteProperty(propertyId: string){
    const trx = await db.transaction();
    var rollbacks: (() => Promise<void>)[] = [];

    try{
        await trx('propertyEvents').where({refId: propertyId}).then(async events => {
            const promises = events.map(event => deleteEvent(event.id, trx));
            const results = await Promise.allSettled(promises);
            rollbacks = rollbacks.concat((results.filter(result => result.status === 'fulfilled'))
            .map((result: PromiseFulfilledResult<() => Promise<void>>) => result.value));
        });

        //Delete property files:
        const propertyFileData = await trx('propertyFiles').where({refId: propertyId});
        rollbacks = rollbacks.concat( await deleteMultiple('propertyFiles', propertyFileData, trx) );

        await deleteData('properties', {id: propertyId}, trx);
        await trx.commit();

        revalidatePath('/dashboard/properties');
    }
    catch(err){
        //Rollback successful file deletions:
        Promise.all(rollbacks.map(async rollback => await rollback()));

        await trx.rollback();
        throw err;
    }
}