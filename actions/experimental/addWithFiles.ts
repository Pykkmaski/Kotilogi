'use server';

import { getFileTableName } from "kotilogi-app/utils/getFileTableName";
import { addData } from "./addData";
import { addFile } from "./addFile";
import { Knex } from "knex";

export async function addWithFiles<DataT extends Kotilogi.ItemType>(dataTableName: string, data: DataT, files: FormData[], trx: Knex.Transaction){
    /**Creates the file table string and path revalidation strings. */
    

    const dataId = await addData(dataTableName, data, trx);
    console.log(dataId);

    const uploadPromises: Promise<() => Promise<void>>[] = [];
    for(const fileData of files){
        const file = fileData.get('file') as unknown as File;
        uploadPromises.push( 
            addFile(getFileTableName(dataTableName), file, dataId, trx)
        );
    }

    /**Contains the rollback functions for files that successfully uploaded. */
    const fileRollbacks: (() => Promise<void>)[] = [];

    await Promise.allSettled(uploadPromises).then(async results => {
        for(const result of results){
            if(result.status === 'fulfilled'){
                fileRollbacks.push(result.value);
            }
            else{
                console.log(result.reason);
            }
        }
    });

    return {dataId, fileRollbacks}
}