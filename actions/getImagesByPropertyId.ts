import db from "kotilogi-app/dbconfig";

const mime_type = 'image/jpg';

export default async function getImagesByPropertyId(id: number){
    return await db('property_files').where({mime_type, property_id: id});
}