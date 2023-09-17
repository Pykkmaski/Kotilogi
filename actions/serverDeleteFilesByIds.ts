"use server";

import {unlink} from 'fs/promises';
import db from 'kotilogi-app/dbconfig';
import { uploadPath } from 'kotilogi-app/uploadsConfig';
import { serverDeleteDataByIds } from './serverDeleteDataByIds';
import { revalidatePath } from 'next/cache';

export default async function serverDeleteFilesByIds(selectedIds: Kotilogi.IdType[], tableName: Kotilogi.Table): Promise<any | null>{
    /**
     * Deletes the files as well as the associated data entries from the db.
     */
    try{
        selectedIds.forEach(async id => {
            const {filename} = await db(tableName).where({id}).select('fileName').first();
            await unlink(uploadPath + filename);
        });

        await serverDeleteDataByIds(selectedIds, tableName);

        return true;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}