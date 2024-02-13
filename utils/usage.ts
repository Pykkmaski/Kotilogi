import db from "kotilogi-app/dbconfig";

class Usage{
    async get(query: Kotilogi.UsageType){
        return db('usage').where(query);
    }

    async add(data: Kotilogi.UsageType){
        return db('usage').insert(data);
    }
}

export const usage = new Usage();