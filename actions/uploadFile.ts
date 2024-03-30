import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import * as file from './file';

type FileTableName = 'propertyFiles' | 'eventFiles';

function getPathToRevalidate(tableName: FileTableName){

    switch(tableName){
        case 'propertyFiles': return '/properties/[property_id]/';
        case 'eventFiles': return '/events/[event_id]/';
        default: throw new Error('getPathToRevalidate: Received invalid tableName! ' + `(${tableName})`);
    }
}

export async function uploadFile(tableName: FileTableName, fileData: FormData, refId: string){
    const trx = await db.transaction();
    let uploadedFileData: Kotilogi.FileType | null = null;
    let rollbackUpload: () => Promise<void> | null;

    try{
        [[uploadedFileData], rollbackUpload] = await file.upload([fileData]);

        await trx(tableName).insert({
            ...uploadedFileData,
            refId,
        });

        const path = getPathToRevalidate(tableName);
        revalidatePath(path);

        await trx.commit();
    }
    catch(err){
        console.log(err.message);

        if(rollbackUpload){
            try{
                await rollbackUpload();
            }
            catch(err){
                console.log('Upload rollback failed!');
            }
        }

        await trx.rollback();
        throw err;
    }
}