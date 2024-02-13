"use server"

import db from "@/dbconfig";
import { upload } from "../file/upload";
import { getFileTableName } from "./util/getFileTableName";

/**Adds data into the provided database table. 
 * @deprecated This method has been replaced by the add-method in the actions/database module.
*/
export async function addData<T extends Kotilogi.ItemType>(tableName: Kotilogi.Table, data: T, files?: FormData[]){
    var addedData: T;

    return new Promise<T>(async (resolve, reject) => {
        try{
            [addedData] = await db(tableName).insert(data, '*');
            const fileTableName = getFileTableName(tableName);

            if(files && fileTableName){
                await upload(files, addedData.id, fileTableName);
            }

            resolve(addedData);
        }
        catch(err){
            
            if(addedData){
                await db(tableName).where(addedData).del();
            }

            reject(err);
        }
    });
}