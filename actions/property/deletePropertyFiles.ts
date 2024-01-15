'use server';

import { revalidatePath } from "next/cache";
import { deleteFiles } from "../file/deleteFiles";
import db from "kotilogi-app/dbconfig";

export async function deletePropertyFiles(files: Kotilogi.FileType[]){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await deleteFiles('propertyFiles', files);
            revalidatePath('/properties/[property_id]/files');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}