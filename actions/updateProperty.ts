"use server"

import db from "kotilogi-app/dbconfig"

export default async function updateProperty(newData){
    return await db('properties').where({id: newData.id}).update(newData);
}