'use server';

import db from "kotilogi-app/dbconfig";

export async function createBillsFromProperties(customer: string){
    const [{propertyCount}] = await db('properties').where({refId: customer}).count('*', {as: 'propertyCount'});
    const bills = [];
    
}