'use server';

import db from "kotilogi-app/dbconfig";

export async function updateDataById(newData: object, id: Kotilogi.IdType, dbTableName: string){
    return new Promise<object>(async (resolve, reject) => {
        try{
            const updatedData: object = await db(dbTableName).where({id}).update(newData, '*');
            resolve(updatedData[0]);
        }
        catch(err){
            console.log(err.message);
            reject(err.message);
        }
        
    });
}