'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import {unlink} from 'fs/promises';
import { uploadPath } from "kotilogi-app/uploadsConfig";
import { deleteFiles } from "../file/deleteFiles";

export async function deleteProperty(propertyId: Kotilogi.IdType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            await deleteFiles(propertyId, 'propertyFiles');
            await db('properties').where({id: propertyId}).del();
            revalidatePath('/properties');
            resolve();
        }
        catch(err){
            reject(err);
        }
    });
}