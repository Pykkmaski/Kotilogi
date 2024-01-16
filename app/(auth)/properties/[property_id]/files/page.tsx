import db from "kotilogi-app/dbconfig";
import { Content } from "./page.component";

async function getFiles(propertyId){
    return await db('propertyFiles').where({refId: propertyId});
}
export default async function FilesPage({params}){
    const files = await getFiles(params.property_id);

    return <Content files={files} propertyId={params.property_id} />
}