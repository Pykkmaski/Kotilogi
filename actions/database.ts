'use server';

import db from "kotilogi-app/dbconfig";
import { readFile, unlink, writeFile } from "fs/promises";
import { uploadPath } from "kotilogi-app/uploadsConfig";

export async function add<T extends {}>(tablename: string, data: T){
    return db(tablename).insert(data, '*') as Promise<T[]>;
}

export async function get<T extends {}>(tablename: string, query: T){
    return db(tablename).where(query) as unknown as Required<T>[];
}

export async function del<T extends {}>(tablename: string, query: T){
    return db(tablename).where(query).del() as Promise<void>;
}

export async function update<T extends {id: string}>(tablename: string, id: string, data: T){
    return db(tablename).where({id}).update(data);
}

/**
 * Deletes data from the database as well as any files on disk associated with it.
 * @param tablename 
 * @param fileTableName 
 * @param data 
 * @returns 
 */
export async function delWithFiles<T extends Partial<Kotilogi.ItemType>>(tablename: string, fileTableName: 'propertyFiles' | 'eventFiles', data: T){
    const trx = await db.transaction();
    let backupFiles: {fileName: string, file: Buffer}[] = [];
    let deletedFilenames: string[] = [];

    try{
        const fileData = await trx(fileTableName).where({refId: data.id}) as Kotilogi.FileType[];

        //Create backups of the files currently on disk, in case of an error.
        const backupFileReadPromises: Promise<{fileName: string, file: Buffer}>[] = [];
        for(const fd of fileData){
            backupFileReadPromises.push(new Promise<{fileName: string, file: Buffer}>(async (resolve, reject) => {
                try{
                    const buffer = await readFile(uploadPath + fd.fileName)
                    resolve( {
                        fileName: fd.fileName,
                        file: buffer,
                    });
                }
                catch(err){
                    reject(err);
                }
            }));
        }

        backupFiles = await Promise.all(backupFileReadPromises);

        //Delete the files from disk.
        const fileUnlinkPromises: Promise<void>[] = [];
        for(const fd of fileData){
           fileUnlinkPromises.push(
            unlink(uploadPath + fd.fileName)
           );
        }   

        await Promise.all(fileUnlinkPromises);

        const delPromises: Promise<void>[] = [];
        for(const file of fileData){
            delPromises.push(
                trx(fileTableName).where({id: file.id}).del()
            );
        }

        await Promise.all(delPromises);
        await trx.commit();
    }
    catch(err){
        console.log(err.message);

        /*
            Resave the backed-up files. Any files that failed to delete, will throw an error here when trying to re-save them.
            Just log the error.
        */

        const resavePromises: Promise<void>[] = [];
        try{
            for(const backupFile of backupFiles){
                resavePromises.push(
                    writeFile(uploadPath + backupFile.fileName, backupFile.file)
                )
            }

            await Promise.allSettled(resavePromises);
        }
        catch(err){
            console.log(err.message);
        }
          
        await trx.rollback();
        throw err;
    }
}






