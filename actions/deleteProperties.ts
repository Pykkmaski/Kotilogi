"use server"

import db from "kotilogi-app/dbconfig";

export async function deleteProperties(selectedItems: number[]): Promise<{message: string} | undefined>{
    try{
        selectedItems.forEach(async (id: number, index: number) => {
            await db('properties').where({id}).del();
        });
    }
    catch(err){
        return {
            message: 'Talojen poisto epäonnistui!',
        }
    }
    
}