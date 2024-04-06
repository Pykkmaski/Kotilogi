'use server';

import { Knex } from "knex";
import { getFileTableName } from "kotilogi-app/utils/getFileTableName";
import { deleteMultiple } from "./deleteFile";
import { deleteData } from "./deleteData";

export async function deleteWithFiles(tablename: string, dataId: string, trx: Knex.Transaction){
    const fileTableName = getFileTableName(tablename);
    var rollbacks: (() => Promise<void>)[] = [];

    try{
        const fileData = await trx(fileTableName).where({refId: dataId});
        rollbacks = await deleteMultiple(fileTableName, fileData, trx);
        await deleteData(tablename, {id: dataId}, trx);
        return rollbacks;
    }
    catch(err){

        for(const rollback of rollbacks){
            await rollback();
        }

        throw err;
    }
    
}