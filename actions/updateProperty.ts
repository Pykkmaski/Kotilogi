"use server"

import db from "kotilogi-app/dbconfig"
import { PropertyType } from "kotilogi-app/types/PropertyType";

export default async function updateProperty(newPropertyData: PropertyType): Promise<PropertyType | null>{
    try{
        const updatedProperty: PropertyType = await db('properties').where({id: newPropertyData.id}).update(newPropertyData);
        return updatedProperty;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
    
}