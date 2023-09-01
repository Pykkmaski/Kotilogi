"use server"

import db from "kotilogi-app/dbconfig";
import { EventType } from "kotilogi-app/types/EventType";
import { PropertyType } from "kotilogi-app/types/PropertyType";
import generateId from "kotilogi-app/utils/generateId";
import processFormData from "kotilogi-app/utils/processFormData";

type ParamType = PropertyType | EventType;

export async function serverAddData(data: FormData, dbTableName: string): Promise<ParamType | null>{
    try{
        const property: ParamType = {
            ...processFormData<ParamType>(data),
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