"use server"

import db from "kotilogi-app/dbconfig";

export async function deleteProperties(selectedItems: number[]): Promise<void>{
    selectedItems.forEach(async (id: number, index: number) => {
        await db('properties').where({id}).del();
    });
}