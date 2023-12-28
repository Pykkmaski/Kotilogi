'use server';

import db from "kotilogi-app/dbconfig";

export async function getDataBySearch(tableName: string, search: {what: string, column: string | null}){
    return db(tableName).where(search.column, 'like', `%${search.what}%`);
}