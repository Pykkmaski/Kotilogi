'use server';

import { Knex } from "knex";
import db from "kotilogi-app/dbconfig";

/**
 * Adds data into the database. Can be used on its own, or as part of a larger operation. In the latter case, a transaction should be provided.
 * @param tablename 
 * @param data 
 * @param trx An optional knex transaction object. If one is not provided, the function creates its own transaction and commits, or rolls it back on failure.
 * @returns 
 */
export async function addData<T extends Kotilogi.ItemType>(tablename: string, data: T, trx?: Knex.Transaction){
    const dbcon = trx || db;
    const [{id}] = await dbcon(tablename).insert(data, 'id') as [{id: string}];
    return id;
}