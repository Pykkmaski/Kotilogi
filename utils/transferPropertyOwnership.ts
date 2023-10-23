import db from "kotilogi-app/dbconfig";
import bcrypt from 'bcrypt';

const ErrorCode = {
    SUCCESS: 0,
    NOT_FOUND: 1,
    INVALID: 2,
    EXPIRED: 3,
    UNEXPECTED: 4,
}

type ErrorMessage = {
    message: string | null,
    code: number,
}

export default async function transferPropertyOwnership(propertyId: Kotilogi.IdType, toOwner: Kotilogi.IdType, verificationCode: string): Promise<ErrorMessage>{
    /**
     * Transfers the ownership of a property to another user.
     * @param {Kotilogi.IdType} propertyId The id of the property to be transferred.
     * @param {Kotilogi.IdType} toOwner The id of the owner to which the property is transferred.
     * @param {string} transferCode The secret code used to verify the transfer.
     * @returns {Promise<ErrorMessage>} A promise resolving to an object containing a message containing null, or an error message on failure, as well as an error code.
     */

    try{
        const transferOrder = await db('propertyTransferOrders').where({propertyId, toOwner}).first();
        if(!transferOrder) return {
            message: 'Transfer order not found!',
            code: ErrorCode.NOT_FOUND,
        }
        
        //Reject expired codes.
        const codeIsActive = Date.now() < transferOrder.expires;
        if(!codeIsActive) return {
            message: 'Verification code is expired!',
            code: ErrorCode.EXPIRED,
        }

        //Reject verification codes not matching the encryted code on the database.
        const verificationCodeOk = await bcrypt.compare(verificationCode, transferOrder.verificationCode);
        if(!verificationCodeOk) return {
            message: 'Verification code is invalid!',
            code: ErrorCode.INVALID,
        }
    
        //Update the owner id of the given property id.
        await db('properties').where({id: propertyId}).update({
            refId: toOwner,
        });
    
        return {
            message: null,
            code: ErrorCode.SUCCESS,
        };
    }
    catch(err){
        console.log(err.message);
        return {
            message: 'An unexpected error occured!',
            code: ErrorCode.UNEXPECTED,
        }
    }
}