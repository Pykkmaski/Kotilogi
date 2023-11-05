/**
 * Returns the number of properties a user is allowed to add based on their account type.
 * @param {string} accountType The account type to check.
 * @returns {Promise<number>} Resolves to the number of properties allowed. Negative numbers are interpreted as infinite. 0 if the account with the provided id is not found.
 */

import db from "kotilogi-app/dbconfig";

export default async function getMaxPropertiesByAccountId(id: Kotilogi.IdType): Promise<number>{
    const account = await db('users').where({id}).select('plan').first();
    if(!account) return 0;

    switch(account.plan){
        case 'regular':
            return 2;

        case 'pro':
            return -1;

        default: return 2;
    }
}