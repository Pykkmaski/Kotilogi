"use server"

import db from "kotilogi-app/dbconfig";
import { EventType } from "kotilogi-app/types/EventType";
import { PropertyType } from "kotilogi-app/types/PropertyType";
import generateId from "kotilogi-app/utils/generateId";
import formDataToType from "kotilogi-app/utils/formDataToType";

type ParamType = PropertyType | EventType;

export async function serverAddData(data: FormData, dbTableName: string): Promise<ParamType | null>{
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