'use server';

import db from "kotilogi-app/dbconfig";
import { getFileTableName } from "./util/getFileTableName";
import { deleteFiles } from "../file/deleteFiles";

/**
 * A function that deletes data from the database, and any files that are associated with that data.
 * @deprecated This function has been replaced by the del-method in the actions/database module.
 */
export async function deleteData(tablename: string, dataId: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const fileTableName = getFileTableName(tablename);
            
            if(fileTableName){
                const files = await db(fileTableName).where({refId: dataId}).select('fileName', 'id');
                await deleteFiles(fileTableName, files);
            }
            
            await db(tablename).where({id: dataId}).del();
            resolve();
        }
        catch(err){
            reject(err);
        }
    })
}