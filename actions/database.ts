'use server';

import db from "kotilogi-app/dbconfig";
import * as file from './file';
import {cookies} from 'next/headers';

export async function add<T extends {}>(tablename: string, data: T){
    return db(tablename).insert(data, '*') as Promise<T[]>;
}

export async function get<T extends {}>(tablename: string, query: T){
    return db(tablename).where(query) as Required<T>[];
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
export async function addWithFiles<T extends Partial<Kotilogi.ItemType>>
    (tablename: string, fileTableName: 'propertyFiles' | 'eventFiles', data: T, files?: FormData[]){
    var addedData: T | null = null;
    let addedFiles: Kotilogi.FileType[] = [];
    let filesSavedSuccessFully = false;
    let dataSavedSuccessfully = false;

    return new Promise<T>(async (resolve, reject) => {
        const trx = await db.transaction();

        try{
            [addedData] = await db(tablename).insert(data, '*').then((data: T[]) => {
                dataSavedSuccessfully = true;
                return data;
            });

            if(files){
                const promises: Promise<Kotilogi.FileType>[] = [];
                for(const fdata of files){
                    promises.push(file.upload(fileTableName, addedData.id, fdata));
                }
    
                addedFiles = await Promise.all(promises).then((data: Kotilogi.FileType[]) => {
                    filesSavedSuccessFully = true;
                    return data;
                });
            }
            
            await trx.commit();
            resolve(addedData);
        }
        catch(err){

            if(dataSavedSuccessfully){
                await trx.rollback();
            }

            if(filesSavedSuccessFully){
                //Delete any files saved

            }

            reject(err);
        }
    });
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






