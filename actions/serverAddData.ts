"use server"

import db from "kotilogi-app/dbconfig";
import generateId from "kotilogi-app/utils/generateId";
import isAllowedToAddProperty from "kotilogi-app/utils/isAllowedToAddProperty";

type ParamType = Kotilogi.PropertyType | Kotilogi.EventType;

/**
 * Runs checks based on what table data is being inserted into, and returns true if ok, false otherwise.
 * @param data 
 * @param tableName 
 */

async function validateData(data: any, tableName: Kotilogi.Table): Promise<boolean>{
    if(tableName === 'properties'){
        return await isAllowedToAddProperty(data.refId);
    }

    return true;
}

export async function serverAddData(data: any, tableName: Kotilogi.Table): Promise<ParamType | null>{

    return new Promise<ParamType>(async (resolve, reject) => {
        try{
            const dataToSave: ParamType = {
                ...data,
            }
    
            const ok = await validateData(dataToSave, tableName);
    
            if(!ok) throw new Error('Adding of data was rejected!');
    
            const insertedData: ParamType[] = await db(tableName).insert(dataToSave, '*');
    
            resolve(insertedData[0]);
        }
        catch(err){
            console.log('Server add data: ' + err.message);
            reject(err);
        }
    });
}