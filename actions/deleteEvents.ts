"use server"

import db from "kotilogi-app/dbconfig";

export async function deleteEvents(selectedItems: number[]): Promise<void>{
    selectedItems.forEach(async (id: number, index: number) => {
        await db('property_events').where({id}).del();
    });
}