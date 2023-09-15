"use server";

import db from "kotilogi-app/dbconfig";
import { AcceptedGalleryTypes } from "kotilogi-app/components/Gallery/Types";

export async function serverGetData(dbTableName: string, query: any, onlyOne: boolean): Promise<AcceptedGalleryTypes | AcceptedGalleryTypes[] | null>{
    var data: AcceptedGalleryTypes | AcceptedGalleryTypes[] | undefined;
    if(onlyOne){
        data = await db(dbTableName).where(query).first();
    }
    else{
        data = await db(dbTableName).where(query);
    }

    return data || null;
}

export async function serverGetDataById(id: Kotilogi.IdType, dbTableName: string): Promise<AcceptedGalleryTypes | null>{
    try{
        const data: AcceptedGalleryTypes | undefined = await db(dbTableName).where({id}).first();
        if(!data) throw new Error(`serverGetDataById: Data with id ${id} from table ${dbTableName} not found!`);
        return data;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}

export async function serverGetDataByArray(ids: Kotilogi.IdType[], dbTableName: Kotilogi.Table): Promise<object[] | null>{
    try{
        const data = await db(dbTableName).whereIn('id', ids);
        return data;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}

export async function serverGetDataByPropertyId(property_id: Kotilogi.IdType, dbTableName: 'property_events' | 'property_files' | 'property_images'): Promise<(Kotilogi.EventType | Kotilogi.PropertyFileType)[] | null>{
    try{
        return await db(dbTableName).where({property_id});
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}

export async function getPropertiesByOwner(owner: string): Promise<Kotilogi.PropertyType[] | null>{
    try{
        return await db('properties').where({owner});
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}