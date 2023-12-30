'use server';

import crypto from 'crypto';
import db from 'kotilogi-app/dbconfig';
import bcrypt from 'bcrypt';
import serverSendHTMLEmail from 'kotilogi-app/actions/email/serverSendHTMLEmail';
import serverSendEmail from 'kotilogi-app/actions/email/serverSendEmail';
import { ErrorCode } from 'kotilogi-app/constants';
import jwt from 'jsonwebtoken';

/**
 * Creates an order to transfer the ownership of a property to another user and sends the verification code to the recipient.
 * @param {Kotilogi.IdType} propertyId The id of the property to be transferred.
 * @param {Kotilogi.IdType} toOwner The id, or email of the user to whom the property shall be transferred.
 * @returns {Promise<boolean>} A promise resolving to true if the order is created successfully, or false if an error occurs.
 */

export default async function createPropertyTransferOrder(propertyId: Kotilogi.IdType, toOwner: Kotilogi.IdType): Promise<boolean>{
    try{
        const expiryTime = process.env.TRANSFER_ORDER_EXPIRY;
        const orderExpiryTime = expiryTime ? parseInt(expiryTime) + Date.now() : 0;

        const order = {
            propertyId,
            toOwner,
            verificationCode: crypto.randomBytes(32).toString('base64'),
            expires: orderExpiryTime,
        }

        const message: string = `
            Sinulle on luotu talon omistajuuden siirtoa varten varmenne!
            Voit hyväksyä talon siirron itsellesi käyttämällä varmenteen ennen kuin se raukeaa.
            ${order.verificationCode}
        `;

        const error = await serverSendEmail('Talon omistajuuden vastaanoton varmenne', process.env.SERVICE_EMAIL_ADDRESS as string, toOwner, message);
        if(error.code !== ErrorCode.SUCCESS) throw new Error('Failed to create property! Unable to send verification code to recipient!');

        await db('propertyTransferOrders').insert(order);
        
        return true;
    }
    catch(err){
        console.log(err.message);

        return false;   
    }
}