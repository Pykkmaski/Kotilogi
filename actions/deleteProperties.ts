"use server"

import db from "kotilogi-app/dbconfig";

export async function deleteProperties(selectedItems: number[]): Promise<{message: string} | null>{
    try{
        selectedItems.forEach(async (id: number, index: number) => {
            await db('properties').where({id}).del();
        });

        return null;
    }
    catch(err){
        return {
            message: 'Talojen poisto epäonnistui!',
        }
    }
    
}