import db from "kotilogi-app/dbconfig";
import { Content } from "./page.module";

export default async function Page({params}){
    const files = await db('eventFiles').where({refId: params.event_id, mimeType: 'image/jpeg'});
    
    return <Content files={files} eventId={params.event_id}/>
}