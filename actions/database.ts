'use server';

import db from "kotilogi-app/dbconfig";
import * as file from './file';
import {cookies} from 'next/headers';
import { readFile, unlink, writeFile } from "fs/promises";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import { Knex } from "knex";
import { createCart } from "./bills";
import { files } from "kotilogi-app/utils/files";

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
 * Adds data into the database, and saves any files with it onto disk.
 * @param tablename 
 * @param fileTableName 
 * @param data 
 * @param files 
 * @returns 
 */
export async function addWithFiles<T extends Partial<Kotilogi.ItemType>>(
    trx: Knex.Transaction,
    tablename: string, 
    fileTableName: 'propertyFiles' | 'eventFiles', 
    data: T,
    files?: FormData[]){

    let addedFilesData: Kotilogi.FileType[] = [];

    try{
        const [addedData] = await db(tablename).transacting(trx).insert(data, '*') as T[];

        if(files){
            //Upload all files
            const filePromises: Promise<Kotilogi.FileType[]>[] = [];
            for(const fdata of files){
                filePromises.push(file.upload([fdata]));
            }
            
            //Get the file data objects.
            await Promise.allSettled(filePromises).then((results) => {
                let rejectedCount: number = 0;

                results.forEach(result => {
                    if(result.status === 'fulfilled'){
                        addedFilesData.push(result.value);
                    }
                    else{
                        rejectedCount++;
                    }
                });

                if(rejectedCount > 0){
                    throw new Error('Some files failed to upload!');
                }
            });

            //Insert the file data objects into the database.
            const insertPromises: Promise<void>[] = [];
            for(const fileData of addedFilesData){
                insertPromises.push(
                    db(fileTableName).transacting(trx).insert({
                        ...fileData,
                        refId: addedData.id,
                    })
                );
            }

            await Promise.all(insertPromises);
        }

        return addedData;
    }
    catch(err){
        console.log(err.message);

        for(const file of addedFilesData){
            try{
                await unlink(uploadPath + file.fileName);
            }
            catch(err){
                console.log(err.message);
                throw err;
            }
        }

        throw err;
    }
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

/**
 * Helper function to upload files.
 * @param files 
 * @param refId 
 */
async function uploadFiles(files: FormData[], refId: string){
    return await file.upload(files).then(uploadResults => {
        const successfullUploads = uploadResults.filter(result => result.status === 'fulfilled');
        const failedUploads = uploadResults.filter(result => result.status === 'rejected');
        if(failedUploads.length) throw new Error('Some files failed to upload!');

       return successfullUploads.map((result: PromiseFulfilledResult<Kotilogi.FileType>) => result.value);
    });
}

async function insertFileData(trx: Knex.Transaction, addedFileData: Kotilogi.FileType[], tablename: string){
    const insertPromises: Promise<void>[] = [];
    for(const addedFile of addedFileData){
        insertPromises.push(
            trx(tablename).insert(addedFileData)
        );
    }
}

export async function addViaTransaction<T extends Partial<Kotilogi.ItemType>>(
    trx: Knex.Transaction, 
    tablename: string, 
    fileTablename: 'propertyFiles' | 'eventFiles',
    data: T, 
    files?: FormData[]){

    let addedFileData: Kotilogi.FileType[] = [];

    try{
        //Add the data into the database.
        const [addedDataId] = await trx(tablename).insert(data, 'id') as string[];

        //Upload the files
        addedFileData = await uploadFiles(files, addedDataId);

        //Insert the files into the db.
        await trx(fileTablename).insert(addedFileData);

        return addedDataId;
    }
    catch(err){
        console.log(err.message);
        await file.unlinkMultiple(trx, fileTablename, addedFileData)
        throw err;
    }
}






