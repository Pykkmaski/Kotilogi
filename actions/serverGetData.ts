"use server";

import db from "kotilogi-app/dbconfig";

export async function serverGetData(dbTableName: string, query: any, onlyOne: boolean = false){
    if(onlyOne){
        return db(dbTableName).where(query).first();
    }
    else{
        return db(dbTableName).where(query);
    }
}

export async function serverGetDataOffset(dbTableName: Kotilogi.Table, query: any, offsetAmount: number, limit: number){
    return db(dbTableName).where(query).offset(offsetAmount).limit(limit);
}

export async function serverGetDataByRefId(refId: Kotilogi.IdType, dbTableName: Kotilogi.Table, onlyOne: boolean = false): Promise<object | object[] | null>{
    try{
        var data: object;
        if(onlyOne){
            data = await db(dbTableName).where({refId}).first();
            if(!data) throw new Error('Data with refId ' + refId + ' not found!');
        }
        else{
            data = await db(dbTableName).where({refId}).orderBy('createdAt', 'asc');
        }

        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export async function serverGetDataById(id: Kotilogi.IdType, dbTableName: string): Promise<object | null>{
    try{
        const data: object = await db(dbTableName).where({id}).first();
        if(!data) throw new Error(`serverGetDataById: Data with id ${id} from table ${dbTableName} not found!`);
        return data;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}



