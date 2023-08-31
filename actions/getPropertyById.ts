import db from "kotilogi-app/dbconfig";
import { Property } from "kotilogi-app/types/Types";

export default async function getPropertyById(id: string): Promise<Property | undefined>{
    return await db('properties').where({id}).first();
}