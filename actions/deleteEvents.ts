"use server"
import db from "kotilogi-app/dbconfig";

export async function deleteEvents(selectedItems: number[]): Promise<{message: string} | null>{
    try{
        for(const id of selectedItems){
            await db('property_events_1').where({id}).del();
        }
        return null;
    }
    catch(err){
        return {
            message: 'Tapahtumien poisto epäonnistui!',
        };
    } 
}