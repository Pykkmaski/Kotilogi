'use server';

import db from "kotilogi-app/dbconfig";
import { addData } from "./addData";
import { addWithFiles } from "./addWithFiles";
import { createBill } from "../bills";
import { revalidatePath } from "next/cache";
import { createDueDate } from "kotilogi-app/utils/createDueDate";

export async function addProperty(property: Kotilogi.PropertyType, files?: FormData[]){
    const trx = await db.transaction();
    var addWithFilesResult = null;

    try{

        if(files){
            addWithFilesResult = await addWithFiles('properties', property, files, trx);
        }
        else{
            await addData('properties', property, trx);
        }

        const bill = {
            amount: 990,
            targetId: addWithFilesResult.dataId,
            customer: property.refId,
            due: createDueDate(30),
            stamp: 'add_property',
        }

        await addData('bills', bill as any, trx);

        await trx.commit();
        revalidatePath('/dashboard/properties');
    }
    catch(err){
        if(addWithFilesResult){
            const rollbackPromises: Promise<void>[] = [];
            for(const rollback of addWithFilesResult.fileRollbacks){
                rollbackPromises.push(
                    rollback()
                );
            }
            await Promise.all(rollbackPromises)
            .catch(err => console.log(err.message));
        }

        await trx.rollback();
        throw err;
    }
}