"use server"

import db from "kotilogi-app/dbconfig";

export async function deleteProperty(selectedItems: number[]): Promise<{message: string} | null>{
    try{
        selectedItems.forEach(async (id: number, index: number) => {
            await db('property_files').where({id}).del();
        });

        return null;
    }
    catch(err){
        return {
            message: 'Talojen poisto epäonnistui!',
        }
    }
    
}