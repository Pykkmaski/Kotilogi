"use server"
import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

export async function deleteEvents(selectedItems: string[]): Promise<{message: string} | null>{
    try{
        for(const id of selectedItems){
            await db('property_events').where({id}).del();
        }
        revalidatePath('/events');
        return null;
    }
    catch(err){
        return {
            message: 'Tapahtumien poisto epäonnistui!',
        };
    } 
}