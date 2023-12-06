'use server';

import { ErrorCode } from "kotilogi-app/constants";
import db from "kotilogi-app/dbconfig";
import getMaxPropertiesByAccountId from "kotilogi-app/utils/getMaxPropertiesByAccountType";

/**
 * Runs checks to make sure a user is allowed to add more properties.
 * @param email The email of the user.
 */

export default async function isAllowedToAddProperty(email: string): Promise<boolean>{
    try{
        //Get the number of properties the user has already saved.
        const [properties] = await db('properties').where({refId: email}).count('*', {as: 'count'});

        //Get the number of properties the user is allowed to have.
        const maxPropertiesAllowed = await getMaxPropertiesByAccountId(email);

        //Throw an error if the number allowed is 0.
        if(maxPropertiesAllowed == 0) throw new Error('Cannot verify if assing a property is allowed because user with email ' + email + ' not found!');

        return maxPropertiesAllowed < 0 || properties.count < maxPropertiesAllowed;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}