"use server"

import db from "kotilogi-app/dbconfig";
import generateId from "kotilogi-app/utils/generateId";

type ParamType = Kotilogi.PropertyType | Kotilogi.EventType;

export async function serverAddData(data: any, dbTableName: string): Promise<ParamType | null>{
    try{
        const dataToSave: ParamType = {
            ...data,
        }

        const insertedData: ParamType[] = await db(dbTableName).insert(dataToSave, '*');

        if(String('propertyImages eventImages').includes(dbTableName)){
            //In case an image was uploaded, make the first image uploaded the main image by default.
            const images: {count: number} | undefined =  db(dbTableName).where({refId: data.refId}).count('*', {as : 'count'});
            const imageData = insertedData[0];
            console.log(imageData);
            
            if(!images || images.count == 1){
                //Set the main image id of the refId to be the image id.
                if(dbTableName === 'propertyImages'){
                    await db('properties').where({id: imageData.refId}).update({mainImageId: imageData.id})
                }
                else if(dbTableName === 'eventImages'){
                    await db('propertyEvents').where({id: imageData.refId}).update({mainImageId: imageData.id});
                }
            }
        }

        return insertedData[0];
    }
    catch(err){
        console.log('Server add data: ' + err.message);
        return null;
    }
}