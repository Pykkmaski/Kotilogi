"use server"

import db from "kotilogi-app/dbconfig"
import { AcceptedGalleryTypes } from "kotilogi-app/components/Gallery/Types";

export default async function serverUpdateDataById(newData: AcceptedGalleryTypes, dbTableName: string): Promise<AcceptedGalleryTypes | null>{
    ///Updates the data with id in given database tablename and returns the updated data.
    try{
        const updatedProperty: AcceptedGalleryTypes = await db(dbTableName).where({id: newData.id}).update(newData, '*');
        return updatedProperty[0];
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}