'use server';

import db from "kotilogi-app/dbconfig";
import { logError } from "kotilogi-app/utils/logError";

export async function getData(dbTableName: string, query: any, onlyOne: boolean = false){
    if(onlyOne){
        return db(dbTableName).where(query).first();
    }
    else{
        return db(dbTableName).where(query);
    }
}

export async function getDataBySearch(tableName: string, search: {what: string, column: string | null}){
    return db(tableName).where(search.column, 'like', `%${search.what}%`);
}

/**
 * Returns data from a table, offset by an amount from the beginning of found data.
 * @param dbTableName 
 * @param query 
 * @param offsetAmount 
 * @param limit 
 * @returns 
 */
export async function getDataWithOffset(dbTableName: Kotilogi.Table, query: any, offsetAmount: number, limit: number){
    return db(dbTableName).where(query).offset(offsetAmount).limit(limit);
}

/**
 * Returns the item matching the provided id from the provided table.
 * @param id 
 * @param dbTableName 
 * @returns 
 */
export async function getDataById(id: Kotilogi.IdType, dbTableName: string): Promise<object | null>{
    try{
        const data: object = await db(dbTableName).where({id}).first();
        if(!data) throw new Error(`serverGetDataById: Data with id ${id} from table ${dbTableName} not found!`);
        return data;
    }
    catch(err){
        logError(err);
        return null;
    }
}

export async function getDataByRefId(refId: Kotilogi.IdType, dbTableName: Kotilogi.Table, onlyOne: boolean = false): Promise<object | object[] | null>{
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
        logError(err);
        return null;
    }
}