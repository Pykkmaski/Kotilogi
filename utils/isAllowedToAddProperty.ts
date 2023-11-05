'use server';

import { ErrorCode } from "kotilogi-app/constants";
import db from "kotilogi-app/dbconfig";
import getMaxPropertiesByAccountId from "kotilogi-app/utils/getMaxPropertiesByAccountType";

/**
 * Runs checks to make sure a user is allowed to add more properties. Returns code NOT_ALLOWED if 
 * adding of a property is not allowed, UNEXPECTED when an error unrelated to the goal of the function occur, or SUCCESS if the property is allowed to be added.
 * @param email The email of the user.
 * @returns An error-object containing a message and an error code.
 */

export default async function isAllowedToAddProperty(email: string): Promise<Kotilogi.Error>{
    try{
        //Get the number of properties the user has already saved.
        const properties = await db('properties').where({refId: email}).count('*', {as: 'count'}) as {count: number};

        //Get the number of properties the user is allowed to have.
        const maxPropertiesAllowed = await getMaxPropertiesByAccountId(email);

        //Throw an error if the number allowed is 0.
        if(maxPropertiesAllowed == 0) throw new Error('Cannot verify if assing a property is allowed because user with email ' + email + ' not found!');

        //Check if the user is allowed to add another property.
        const isAllowedToAddProperty = maxPropertiesAllowed < 0 || properties.count < maxPropertiesAllowed;

        if(!isAllowedToAddProperty) return {
            message: 'Disallowed to add another property!',
            code: ErrorCode.NOT_ALLOWED,
        }
        
        return {
            message: null,
            code: ErrorCode.SUCCESS,
        }

    }
    catch(err){
        console.log(err.message);
        return {
            message: err.message,
            code: ErrorCode.UNEXPECTED,
        }
    }
}