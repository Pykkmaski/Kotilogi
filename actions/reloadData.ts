"use server";

import { ContentType } from "kotilogi-app/components/Gallery/Types";
import db from "kotilogi-app/dbconfig";

type ContentOptions = {
    contentType: ContentType,
    owner?: string,
    id?: number,
}

export default async function reloadData(options: ContentOptions){
    try{
        var content = null;
        switch(options.contentType){
            case 'property':{
                const tableName = 'properties';
                if(options.owner && options.id){
                    content = await db(tableName).where({owner: options.owner, id: options.id});
                } else if(options.owner) {
                    content = await db(tableName).where({owner: options.owner});
                } else if(options.id){
                    content = await db(tableName).where({id: options.id}).first();
                }
            }
            break;   
        }
    }
    catch(err){
        return {
            error: err,
        }
    }
}