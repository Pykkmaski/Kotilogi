"use server";

import db from "kotilogi-app/dbconfig";
import { IdType } from "kotilogi-app/types/Types";
import { PropertyType } from "kotilogi-app/types/PropertyType";
import { AcceptedGalleryTypes } from "kotilogi-app/components/Gallery/Types";
import { EventType } from "kotilogi-app/types/EventType";
import { PropertyFileType } from "kotilogi-app/types/PropertyFileType";
import { PropertyImageType } from "kotilogi-app/types/PropertyImageType";

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

export async function serverGetDataById(id: IdType, dbTableName: string): Promise<AcceptedGalleryTypes | null>{
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

export async function serverGetDataByPropertyId(property_id: IdType, dbTableName: 'property_events' | 'property_files' | 'property_images'): Promise<(EventType | PropertyFileType | PropertyImageType)[] | null>{
    try{
        return await db(dbTableName).where({property_id});
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}

export async function getPropertiesByOwner(owner: string): Promise<PropertyType[] | null>{
    try{
        return await db('properties').where({owner});
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}