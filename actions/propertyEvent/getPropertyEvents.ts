import db from "kotilogi-app/dbconfig";

type EventType = {
    id: Kotilogi.IdType,
    title: string,
}

export async function getPropertyEvents(propertyId: Kotilogi.IdType, limit: number, page?: number){
    return new Promise<EventType[]>(async (resolve, reject) => {
        try{
            const tableName = 'propertyEvents';

            var events: EventType[] = [];

            if(page !== undefined){
                events = await db(tableName).where({refId: propertyId}).offset(page).limit(limit);
            }
            else{
                events = await db(tableName).where({refId: propertyId}).limit(limit);
            }

            resolve(events);
        }
        catch(err){
            reject(err);
        }
    });
}
