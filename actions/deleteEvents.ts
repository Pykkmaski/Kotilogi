"use server"
import db from "kotilogi-app/dbconfig";

export async function deleteEvents(selectedItems: number[]): Promise<{message: string} | undefined>{
    try{
        for(const id of selectedItems){
            await db('property_events_1').where({id}).del();
        }
    }
    catch(err){
        return {
            message: 'Tapahtumien poisto epäonnistui!',
        };
    } 
}