import db from "kotilogi-app/dbconfig";

export default async function getPropertyById(id: number){
    return await db('properties').where({id}).first();
}