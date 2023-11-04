'use server';

import { ErrorCode } from "kotilogi-app/constants";
import db from "kotilogi-app/dbconfig";

/**
 * Updates a user's data.
 * @param id The ID of the user to update.
 * @param newUserData The updated user data.
 */

export default async function updateUser(id: Kotilogi.IdType, newUserData: {email?: string, password?: string}): Promise<Kotilogi.Error>{
    try{
        await db('users').where({id}).update(newUserData);
        return {
            message: null,
            code: ErrorCode.SUCCESS,
        }
    }
    catch(err){
        console.log(err.message);
        return {
            message: null,
            code: ErrorCode.UNEXPECTED,
        }
    }
}