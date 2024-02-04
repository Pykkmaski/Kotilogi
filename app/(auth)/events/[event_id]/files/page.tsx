import db from "kotilogi-app/dbconfig";
import { Content } from "./page.components";

export default async function Page({params}){
    const files = await db('eventFiles').where({refId: params.event_id, mimeType: 'application/pdf'});
    
    return <Content files={files} eventId={params.event_id}/>
}