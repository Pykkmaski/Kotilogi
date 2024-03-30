'use server';

import db from "kotilogi-app/dbconfig";
import { FileTableName } from "kotilogi-app/types/FileTableName";
import * as file from './file';
import { getPathToRevalidate } from "./util/getPathToRevalidate";
import { revalidatePath } from "next/cache";

export async function deleteFile(tableName: FileTableName, fileData: Kotilogi.FileType){
    return new Promise<void>(async (resolve, reject) => {
        let rollbackDelete: () => Promise<void>;
        const trx = await db.transaction();
        
        try{
            rollbackDelete = await file.del([fileData]);
            await trx(tableName).where({id: fileData.id}).del();
            await trx.commit();
            
            const path = getPathToRevalidate(tableName);
            revalidatePath(path);

            resolve();
        }
        catch(err){
            try{
                if(rollbackDelete){
                    rollbackDelete();
                }
                await trx.rollback();
            }
            catch(err){
                console.log(err.message);
            }
            
            reject(err);
        }
    });
}