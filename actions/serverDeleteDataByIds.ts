import db from "kotilogi-app/dbconfig";
import { IdType } from "kotilogi-app/types/IdType";

export async function serverDeleteDataByIds(selectedItemIds: IdType[], dbTableName: string): Promise<boolean>{
    try{
        selectedItemIds.forEach(async (id: IdType, index: number) => {
            await db(dbTableName).where({id}).del();
        });

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}