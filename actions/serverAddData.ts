"use server"

import db from "kotilogi-app/dbconfig";
import generateId from "kotilogi-app/utils/generateId";
import formDataToType from "kotilogi-app/utils/formDataToType";

type ParamType = Kotilogi.PropertyType | Kotilogi.EventType;

export async function serverAddData(data: any, dbTableName: string): Promise<ParamType | null>{
    try{
        const property: ParamType = {
            ...formDataToType<ParamType>(data),
            id: await generateId(),
        }

        const insertedProperties: ParamType[] = await db(dbTableName).insert(property, '*');
        return insertedProperties[0];
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}