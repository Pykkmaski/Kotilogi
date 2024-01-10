"use server"

import db from "kotilogi-app/dbconfig";

type ParamType = Kotilogi.PropertyType | Kotilogi.EventType;

/**Runs pre-processing on the data, if it is entered into specific tables. 
     * @returns A processed variant of the passed data.
    */
const processData = async (data: any, tableName: Kotilogi.Table) => {
    switch(tableName){
        case 'propertyEvents':{
            const consolidationDelay = process.env.EVENT_CONSOLIDATION_TIME;
            const timeUntilConsolidated = consolidationDelay ? consolidationDelay : '0';

            return {
                ...data,
                consolidationTime: Date.now() + timeUntilConsolidated,
            }
        }

        default: return data;
    }
}

/**
 * Runs checks based on what table data is being inserted into, and returns true if ok, false otherwise.
 * @param data 
 * @param tableName 
 */

const validateData = async (data: any, tableName: Kotilogi.Table) => {
    return true;
}

/**Adds data into the provided database table. */
export async function addData<T extends Kotilogi.ItemType>(data: any, tableName: Kotilogi.Table){

    return new Promise<T>(async (resolve, reject) => {
        try{
            const dataToSave: T = await processData({...data}, tableName);
            const ok = await validateData(dataToSave, tableName);
            
            if(!ok) throw new Error(`Adding of data into table ${tableName} was rejected!`);
    
            const insertedData: T[] = await db(tableName).insert(dataToSave, '*');
    
            resolve(insertedData[0]);
        }
        catch(err){
            console.log('Server add data: ' + err.message);
            reject(err);
        }
    });
}