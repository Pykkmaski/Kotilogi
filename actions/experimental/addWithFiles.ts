'use server';

import { getFileTableName } from "kotilogi-app/utils/getFileTableName";
import { addData } from "./addData";
import { addFile } from "./addFile";
import { Knex } from "knex";
import { Files } from "kotilogi-app/utils/files";

export async function addWithFiles<DataT extends Kotilogi.ItemType>(dataTableName: string, data: DataT, fdata: FormData[], trx: Knex.Transaction){
    /**Creates the file table string and path revalidation strings. */
    

    const dataId = await addData(dataTableName, data, trx);

    const files = new Files();
    const fileTableName = getFileTableName(dataTableName);
    const uploadPromises = fdata.map(file => files.addFile(fileTableName, file.get('file') as unknown as File, dataId, trx));

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