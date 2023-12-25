'use server';

import db from "kotilogi-app/dbconfig";

export async function getDataBySubstring(tableName: string, substring: string, columnName?: string){
    return db(tableName).where('title', 'like', `%${substring}%`);
}