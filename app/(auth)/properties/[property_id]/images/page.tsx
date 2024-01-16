import db from "kotilogi-app/dbconfig";
import { Content } from "./page.component";

async function getImages(propertyId){
    return await db('propertyFiles').where({refId: propertyId});
}
export default async function FilesPage({params}){
    const images = await getImages(params.property_id);

    return <Content files={images} propertyId={params.property_id}/>
}