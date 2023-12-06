import { MaxProperties } from "kotilogi-app/constants";
import db from "kotilogi-app/dbconfig";

/**
 * Returns the number of properties a user is allowed to add based on their account type.
 * @param {string} id The id of the account.
 * @returns {Promise<number>} Resolves to the number of properties allowed. Negative numbers are interpreted as infinite. 0 if the account with the provided id is not found.
 */

export default async function getMaxPropertiesByAccountId(id: Kotilogi.IdType): Promise<number>{
    const {plan} = await db('users').where({email: id}).select('plan').first();
    if(!plan) return 0;

    switch(plan){
        case 'regular':
            return MaxProperties.REGULAR;

        case 'pro':
            return MaxProperties.PRO;

        default: return 0;
    }
}