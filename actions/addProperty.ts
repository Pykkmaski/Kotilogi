"use server"

import db from "kotilogi-app/dbconfig";

export default async function addProperty(data: FormData): Promise<void>{
    const insertedIds = await db('properties').insert(data, 'id');
    return insertedIds.at(0).id;
}