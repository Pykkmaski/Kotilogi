import { Knex } from "knex";
import db from "kotilogi-app/dbconfig";

export class DatabaseTable{
    protected tablename: string;
    protected  dbcon: Knex.Transaction | typeof db;

    constructor(tablename: string, trx?: Knex.Transaction){
        this.tablename = tablename;
        this.dbcon = trx || db;
    }

    pluck(columnName: string, query: TODO){
        return this.dbcon(this.tablename).where(query).pluck(columnName);
    }

    select(columnNames: string | string[], query: TODO){
        try{
            return this.dbcon(this.tablename).where(query).select(columnNames);
        }
        catch(err){
            console.log(err.message);
        }
        
    }

    get(query: TODO){
        return this.dbcon(this.tablename).where(query);
    }

    add<T>(data: T, returns?: string | string[]){
        return this.dbcon(this.tablename).insert(data, returns);
    }

    update<T>(data: T, query: TODO, returns?: string | string[]){
        try{
            return this.dbcon(this.tablename).where(query).update(data, returns);
        }
        catch(err){
            console.log(err.message);
        }
        
    }

    del(query: TODO){
        return this.dbcon(this.tablename).where(query).del();
    }
}