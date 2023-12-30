'use server';

import db from "kotilogi-app/dbconfig";

function addConsolidationTime(eventData: any){
    const consolidationEnvVar = process.env.EVENT_CONSOLIDATION_TIME;
    const consolidationTime = consolidationEnvVar || '';

    return {
        ...eventData,
        consolidationTime: Date.now() + consolidationTime,
    }
}

export async function addPropertyEvent(eventData: any){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const processedData = addConsolidationTime(eventData);
            await db('propertyEvents').insert(processedData);
            resolve();
        }
        catch(err){
            console.log(err.message);
            reject(err.message);
        }
    });
}