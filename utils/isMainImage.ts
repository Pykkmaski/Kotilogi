import db from "kotilogi-app/dbconfig";

export default async function isMainImage(imageId: Kotilogi.IdType, refId: Kotilogi.IdType, tableName: Kotilogi.Table): Promise<boolean>{
    try{
        const target = await db(tableName).where({id: refId, mainImageId: imageId}).first();
        if(!target) return false;

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}