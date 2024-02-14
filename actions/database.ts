'use server';

import db from "kotilogi-app/dbconfig";
import * as file from './file';
import { revalidatePath } from "next/cache";

export async function add<T extends {}>(tablename: string, data: T){
    return db(tablename).insert(data, '*') as Promise<T[]>;
}

export async function get<T extends {}>(tablename: string, query: T){
    return db(tablename).where(query) as T[];
}

export async function del<T extends {}>(tablename: string, query: T){
    return db(tablename).where(query).del() as Promise<void>;
}

export async function update<T extends Kotilogi.ItemType>(tablename: string, id: string, data: T){
    return db(tablename).where({id}).update(data);
}

export async function addWithFiles<T extends Partial<Kotilogi.ItemType>>(tablename: string, fileTableName: 'propertyFiles' | 'eventFiles', data: T, files?: FormData[]){
    var addedData: T | null = null;

    return new Promise<T>(async (resolve, reject) => {
        try{
            [addedData] = await add(tablename, data);

            if(files){
                const promises: Promise<Kotilogi.FileType>[] = [];
                for(const fdata of files){
                    promises.push(file.upload(fileTableName, addedData.id, fdata));
                }
    
                await Promise.all(promises);
            }
            
            resolve(addedData);
        }
        catch(err){

            if(addedData !== null){
                //Delete the data if it was saved.
                await del('properties', addedData)
                .catch(err => console.log(err.message));
            }

            reject(err);
        }
    });
}

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






