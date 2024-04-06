'use server';

import { Knex } from "knex";
import db from "kotilogi-app/dbconfig";

export async function deleteData(tablename: string, query: any, trx?: Knex.Transaction){
    const dbcon = trx || db;
    await dbcon(tablename).where(query).del();
}