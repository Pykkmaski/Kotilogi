'use server';

import db from "kotilogi-app/dbconfig";
import isAllowedToAddProperty from "kotilogi-app/utils/isAllowedToAddProperty";
import { serverAddData } from "./serverAddData";

export const ErrorCode = {
    SUCCESS: 0,
    DISALLOWED: 1,
    UNEXPECTED: 2,
    MAXED_OUT: 3,
}

/**
 * 
 * @param plan The account plan of the user.
 * @param numProperties The object containing the number of properties a user has.
 * @returns True when allowed and false otherwise.
 */

function isAddingPropertyAllowed(plan: Kotilogi.Plans, numProperties: {count: number}): boolean{
    switch(plan){
        case 'regular': return numProperties.count < 1;
        case 'pro':     return true;
        default:        return false;
    }
}

/**
 * Adds a new property for a user.
 * @param email The email of the user.
 */

export default async function serverAddProperty(email: string): Promise<Kotilogi.Error>{
    try{
        const plan = await db('users').where({email}).first().select('plan') as Kotilogi.Plans;
        const [numProperties] = await db('properties').where({refId: email}).count('*', {as: 'count'});
        const ok = isAddingPropertyAllowed(plan, numProperties);
        
        if(!ok) return {
            code: ErrorCode.DISALLOWED,
            message: 'New property rejected!',
        }

        return {
            code: ErrorCode.SUCCESS,
            message: null,
        }
       
    }
    catch(err){
        console.log(err.message);
        return {
            code: ErrorCode.UNEXPECTED,
            message: err.message,
        }
    }
}