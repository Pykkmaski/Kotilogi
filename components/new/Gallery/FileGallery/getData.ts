import { serverGetData } from "kotilogi-app/actions/serverGetData";

export default async function getData(contentType: FileGallery.ContentType, dbTableName: string, target_id: string): Promise<any | null>{
    try{
        switch(dbTableName){
            case 'property_files':{
                return await serverGetData('property_files', {property_id: target_id, mime_type: contentType}, false);
            }

            case 'event_files':{
                return await serverGetData('event_files', {event_id: target_id, mime_type: contentType}, false);
            }

            default: return null;
        }
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}