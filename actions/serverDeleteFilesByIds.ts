"use server";

import {unlink} from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { serverDeleteDataByIds } from './serverDeleteDataByIds';
import { revalidatePath } from 'next/cache';
import serverRevalidatePath from './serverRevalidatePath';

export default async function serverDeleteFilesByIds(selectedIds: Kotilogi.IdType[], tableName: Kotilogi.Table): Promise<any | null>{
    /**
     * Deletes the files as well as the associated data entries from the db.
     */
    try{

        for(const id of selectedIds){
            const {fileName} = await db(tableName).where({id}).select('fileName').first();
            if(!fileName) throw new Error('DeleteFilesByIds: Cannot find file with id ' + id + ' in table: ' + tableName + '. Unable to proceed with deletion!');

            await unlink(uploadPath + fileName);
        }

        await serverDeleteDataByIds(selectedIds, tableName);

        if(tableName == 'propertyImages'){
            serverRevalidatePath('/auth/properties');
        }
        else if(tableName == 'eventImages'){
            serverRevalidatePath('/auth/events/[event_id]/info');
        }
        
        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}