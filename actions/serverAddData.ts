"use server"

import db from "kotilogi-app/dbconfig";
import generateId from "kotilogi-app/utils/generateId";

type ParamType = Kotilogi.PropertyType | Kotilogi.EventType;

export async function serverAddData(data: any, dbTableName: string): Promise<ParamType | null>{
    try{
        const dataToSave: ParamType = {
            ...data,
        }

        const insertedProperties: ParamType[] = await db(dbTableName).insert(dataToSave, '*');
        return insertedProperties[0];
    }
    catch(err){
        console.log('Server add data: ' + err.message);
        return null;
    }
}