'use server';

import db from "kotilogi-app/dbconfig";
import * as file from './file';
import {cookies} from 'next/headers';
import { readFile, unlink } from "fs/promises";
import { uploadPath } from "kotilogi-app/uploadsConfig";
import { Knex } from "knex";
import { createCart } from "./bills";

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
    return new Promise<void>(async (resolve, reject) => {
        try{
            const fileData = await get(fileTableName, {refId: data.id} as Partial<Kotilogi.FileType>);

            const promises: Promise<void>[] = [];
            for(const fd of fileData){
                promises.push(file.del(fileTableName, fd as unknown as Kotilogi.FileType));
            }   

            await Promise.all(promises);

            await del(tablename, {id: data.id});

            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}

/**
 * Helper function to upload files.
 * @param files 
 * @param refId 
 */
async function uploadFiles(files: FormData[], refId: string){
    const addedFileData: Kotilogi.FileType[] = [];

    await file.upload(files).then(uploadResults => {

        let rejectedFiles = 0;
        uploadResults.forEach(result => {
            if(result.status === 'fulfilled'){
                addedFileData.push({
                    ...result.value,
                    refId,
                });
            }
            else{
                rejectedFiles++;
            }
        });

        if(rejectedFiles > 0){
            throw new Error('Some files failed to upload!');
        }
    });

    return addedFileData;
}

async function insertFileData(trx: Knex.Transaction, addedFileData: Kotilogi.FileType[], tablename: string){
    const insertPromises: Promise<void>[] = [];
    for(const addedFile of addedFileData){
        insertPromises.push(
            trx(tablename).insert(addedFileData)
        );
    }
}

export async function addViaTransaction<T extends Kotilogi.ItemType>(
    trx: Knex.Transaction, 
    tablename: string, 
    fileTablename: string,
    data: T, 
    files?: FormData[]){

    let addedFileData: Kotilogi.FileType[] = [];

    try{
        //Add the data into the database.
        const [addedDataId] = await trx(tablename).insert(data, 'id') as string[];

        //Upload the files
        addedFileData = await uploadFiles(files, addedDataId);

        //Insert file data into the database
        await insertFileData(trx, addedFileData, fileTablename);

        return [addedDataId, addedFileData] as const;
    }
    catch(err){
        console.log(err.message);

        for(const fdata of addedFileData){
            try{
                await unlink(fdata.fileName);
            }
            catch(err){
                console.log(err.message);
                throw err;
            }
        }
    
        throw err;
    }
}






