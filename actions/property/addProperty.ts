'use server';

import { MaxProperties } from "kotilogi-app/constants";
import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { addData } from "../data/addData";

/**
 * Returns the number of properties a user is allowed to add based on their account type.
 * @param {string} id The id of the account.
 * @returns {Promise<number>} Resolves to the number of properties allowed. Negative numbers are interpreted as infinite. 0 if the account with the provided id is not found.
 */

export async function getMaxPropertiesByAccountId(id: Kotilogi.IdType): Promise<number>{
    return new Promise<number>(async (resolve, reject) => {
        try{
            const {plan} = await db('users').where({email: id}).select('plan').first();
            if(!plan) resolve(0);

            switch(plan){
                case 'regular':
                    return resolve(MaxProperties.REGULAR);

                case 'pro':
                    return resolve(MaxProperties.PRO);

                default: resolve(0);
            }
        }
        catch(err){
            reject(err);
        }
    })
}

/**
 * Runs checks to make sure a user is allowed to add more properties.
 * @param email The email of the user.
 */

export async function isAllowedToAddProperty(email: string): Promise<boolean>{
    try{
        //Get the number of properties the user has already saved.
        const [properties] = await db('properties').where({refId: email}).count('*', {as: 'count'});

        //Get the number of properties the user is allowed to have.
        const maxPropertiesAllowed = await getMaxPropertiesByAccountId(email);

        //Throw an error if the number allowed is 0.
        if(maxPropertiesAllowed == 0) throw new Error('Cannot verify if adding a property is allowed because user with email ' + email + ' not found!');

        return maxPropertiesAllowed < 0 || properties.count < maxPropertiesAllowed;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}

export async function addProperty(data: Kotilogi.PropertyType, files?: FormData[]){
    return new Promise<object>(async (resolve, reject) => {
        try{
            const ok = await isAllowedToAddProperty(data.refId);
            if(!ok) return reject('not_allowed');

            const property = await addData<Kotilogi.PropertyType>('properties', data, files);
            revalidatePath('/properties');
            resolve(property);
        }
        catch(err){
            console.log(err.message);
            reject(err);
        }
    });
}