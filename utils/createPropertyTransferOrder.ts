'use server';

import crypto from 'crypto';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';

/**
 * Creates an order to transfer the ownership of a property to another user.
 * @param {Kotilogi.IdType} propertyId The id of the property to be transferred.
 * @param {Kotilogi.IdType} toOwner The id, or email of the user to whom the property shall be transferred.
 * @returns {Promise<boolean>} A promise resolving to true if the order is created successfully, or false if an error occurs.
 */

export default async function createPropertyTransferOrder(propertyId: Kotilogi.IdType, toOwner: Kotilogi.IdType): Promise<boolean>{
    try{
        const expiryTime = process.env.TRANSFER_ORDER_EXPIRY;
        const orderExpiryTime = expiryTime ? parseInt(expiryTime) : 0;

        const order = {
            propertyId,
            toOwner,
            verificationCode: await bcrypt.hash(crypto.randomBytes(32).toString('base64'), 15),
            expires: orderExpiryTime,
        }

        await db('propertyTransferOrders').insert(order);
        return true;
    }
    catch(err){
        console.log(err.message);
        return false;   
    }
}