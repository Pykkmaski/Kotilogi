"use server"

import db from "kotilogi-app/dbconfig"

export default async function serverUpdateDataById(newData: object, id: Kotilogi.IdType, dbTableName: string): Promise<object | null>{
    ///Updates the data with id in given database tablename and returns the updated data.
    try{
        const updatedProperty: object = await db(dbTableName).where({id}).update(newData, '*');
        return updatedProperty[0];
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}