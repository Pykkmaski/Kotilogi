import db from "kotilogi-app/dbconfig";

export default async function getPropertiesByOwner(owner: string){
    return await db('properties').where({owner});
}