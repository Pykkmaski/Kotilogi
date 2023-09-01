"use server"

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";

export async function deleteProperties(selectedItems: string[]): Promise<{message: string} | null>{
    try{
        selectedItems.forEach(async (id: string, index: number) => {
            await db('properties').where({id}).del();
        });

        revalidatePath('/auth/properties');
        return null;    
    }
    catch(err){
        return {
            message: 'Talojen poisto epäonnistui!',
        }
    }
    
}