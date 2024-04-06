'use server';
import { readFile, writeFile, unlink } from "fs/promises";
import { Knex } from "knex";
import db from "kotilogi-app/dbconfig";
import { uploadPath } from "kotilogi-app/uploadsConfig";

export async function deleteFile(tablename: 'propertyFiles' | 'eventFiles', fileName: string, trx?: Knex.Transaction){
    const fileBackup: Buffer = await readFile(uploadPath + fileName);
    let fileDeleted = false;

    const rollback = async () => {
        if(fileDeleted){
            //Re-save the file if it was deleted.
            await writeFile(uploadPath + fileName, fileBackup);
            fileDeleted = false;
        }
    }

    try{
        await unlink(uploadPath + fileName).then(() => fileDeleted = true);
        
        //Only delete the database entry here when a stand alone call is made to this function. Otherwise the calling function will handle it.
        if(!trx){
            await db(tablename).where({fileName}).del();
        }

        return rollback;
    }
    catch(err){
        await rollback();
        throw err;
    }
}

export async function deleteMultiple(tablename: 'propertyFiles' | 'eventFiles', fileData: Kotilogi.FileType[], trx: Knex.Transaction){
    var rollbacks: (() => Promise<void>)[] = [];

    try{
        rollbacks = await Promise.allSettled(
            fileData.map(f => deleteFile(tablename, f.fileName, trx))
        )
        .then(results => {
            const fulfilled = results.filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<() => Promise<void>>[];
            const rejected = results.filter(result => result.status === 'rejected');

            if(rejected.length > 0){
                throw new Error('Some files failed to delete!')
            }

            return fulfilled.map(result => result.value);
        });

        return rollbacks;
        
    }
    catch(err){
        await Promise.all(rollbacks.map(async rollback => await rollback()));
        throw err;
    }
}