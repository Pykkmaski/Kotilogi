'use server';
import crypto from 'crypto';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
require('dotenv').config();

function generateCode(){
    const numbers: number[] = [];
    const codeLength = 10;

    for(var i = 0; i < codeLength; ++i){
        const n = crypto.randomInt(9);
        numbers.push(n);
    }

    return numbers.join('');
}

export async function createPropertyTransferOrder(propertyId: Kotilogi.IdType){
    return new Promise<string>(async (resolve, reject) => {
        try{
            const code = generateCode();
            const transferOrderExpiry = process.env.TRANSFER_ORDER_EXPIRY;
            if(!transferOrderExpiry) return reject('Server error: No transfer order expiry env variable present!');

            const expires = Date.now() + transferOrderExpiry;

            await db('propertyTransferOrders').insert({
                verificationCode: code,
                propertyId,
                expires,
            })
            .onConflict('propertyId')
            .merge();

            resolve(code);
        }
        catch(err){
            reject(err);
        }
    })
}