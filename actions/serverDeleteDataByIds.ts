"use server";

import db from "kotilogi-app/dbconfig";
import { IdType } from "kotilogi-app/types/IdType";

export async function serverDeleteDataByIds(selectedItemIds: IdType[], dbTableName: string): Promise<boolean>{
    try{
        await db(dbTableName).whereIn('id', selectedItemIds).del();
        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}