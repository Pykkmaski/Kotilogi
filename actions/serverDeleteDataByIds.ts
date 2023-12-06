"use server";

import {unlink} from 'fs/promises';

import db from "kotilogi-app/dbconfig";
import { uploadPath } from 'kotilogi-app/uploadsConfig';

async function handlePropertyDeletion(selectedItemIds: Kotilogi.IdType[]){
    //Delete all files associated with the property.
    for(const id of selectedItemIds){
        const fileNames = await db('files').where({refId: id}).select('fileName');
        for(const fileName of fileNames){
            await unlink(uploadPath + fileName);
        }
    }

    //Delete the property from the database.
    await db('properties').whereIn('id', selectedItemIds).del();
}

export async function serverDeleteDataByIds(selectedItemIds: Kotilogi.IdType[], tableName: string): Promise<boolean>{
    try{
        /*
            Delete all files associated with the id, if deleting data on the properties or propertyEvents tables.
            It has to be done this way, because there is only one files-table on the db, and a column cannot be setup to refer to 
            multiple tables.
        */

        if(tableName === 'properties' || tableName === 'propertyEvents'){
            //Delete all associated files from the disk before deleting the property (ies) or the event(s).
            for(const id of selectedItemIds){
                const filenames = await db('files').where({refId: id}).select('fileName');

                for(const fileName of filenames){
                    await unlink(uploadPath + fileName);
                }
            }

            await db('files').whereIn('refId', selectedItemIds).del();
        }
        else if(tableName === 'files'){
            for(const id of selectedItemIds){
                const fileName = await db(tableName).where({id}).first().select('fileName');
                await unlink(uploadPath + fileName);
            }
        }

        await db(tableName).whereIn('id', selectedItemIds).del();

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}