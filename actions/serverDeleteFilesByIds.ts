"use server";

import {unlink} from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { serverDeleteDataByIds } from './serverDeleteDataByIds';

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
        
        return selectedIds;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}