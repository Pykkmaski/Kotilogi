import db from "kotilogi-app/dbconfig";

const mime_type = 'application/pdf';

export default async function getFilesByPropertyId(id: number){
    return await db('property_files').where({mime_type, property_id: id});
}