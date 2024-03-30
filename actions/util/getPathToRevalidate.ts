import { FileTableName } from "kotilogi-app/types/FileTableName";

export function getPathToRevalidate(tableName: FileTableName){
    switch(tableName){
        case 'propertyFiles': return '/properties/[property_id]/';
        case 'eventFiles': return '/events/[event_id]/';
        default: throw new Error('getPathToRevalidate: Received invalid tableName! ' + `(${tableName})`);
    }
}