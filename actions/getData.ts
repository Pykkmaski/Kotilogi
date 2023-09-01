import db from "kotilogi-app/dbconfig";
import { PropertyType } from "kotilogi-app/types/PropertyType";

export async function getPropertiesByOwner(owner: string): Promise<PropertyType[] | null>{
    try{
        return await db('properties').where({owner}) as PropertyType[];
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}