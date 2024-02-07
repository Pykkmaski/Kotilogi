import db from "kotilogi-app/dbconfig";

const vismaPay = require('visma-pay');

async function userHasUnresolvedPayments(userEmail: string){
    return new Promise<boolean>(async (resolve, reject) => {
        try{
            const payments = await db('pendingPayments').where({paidOn: null, userEmail});
            resolve(payments.length > 0);
        }
        catch(err: any){
            reject(err);
        }
    });
}

export async function makePayment(userEmail: string){
    return new Promise<void>(async (resolve, reject) => {
        try{
            //Do visma payment here.
            resolve();
        }
        catch(err: any){
            reject(err);
        }
    });
}