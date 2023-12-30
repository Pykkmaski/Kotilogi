'use server';

import db from "kotilogi-app/dbconfig";

export async function receiveOwnership(transferCode: string, newOwner: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const transferOrder = await db('propertyTransferOrders').where({verificationCode: transferCode}).first();
            if(!transferOrder) throw new Error('A transfer order with the provided code does not exist!');

            //Check if the code has expired
            const isExpired = transferOrder.expires > Date.now();
            if(!isExpired) throw new Error('The transfer order with provided code has expired!');

            await db('properties').where({id: transferOrder.propertyId}).update({
                refId: newOwner,
            });

            await db('propertyTransferOrders').where({id: transferOrder.id}).del();

            resolve();
        }
        catch(err){
            reject(err);
        }
    })
}