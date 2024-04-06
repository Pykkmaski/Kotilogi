'use server';

import { Knex } from "knex";
import db from "kotilogi-app/dbconfig";
import { deleteMultiple } from "./deleteFile";
import { deleteData } from "./deleteData";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: string, trx?: Knex.Transaction){
    const dbcon = trx || await db.transaction();
    var rollbacks: (() => Promise<void>)[] = [];

    try{
        const files = await dbcon('eventFiles').where({refId: eventId});
        rollbacks = await deleteMultiple('eventFiles', files, dbcon);
        await deleteData('propertyEvents', {id: eventId}, dbcon);

        if(!trx){
            await dbcon.commit();
        }

        revalidatePath('properties/[property_id]/events');
        return trx ? rollbacks : null;
    }   
    catch(err){
        await Promise.all( rollbacks.map(async rollback => await rollback() ));

        if(!trx){
            await dbcon.rollback();
        }

        throw err;
    }
}