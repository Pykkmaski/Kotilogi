'use client';

/**
 * Returns the number of properties a user is allowed to add based on their account type.
 * @param {string} accountType The account type to check.
 * @returns {number} The number of properties allowed. Negative numbers are interpreted as infinite.
 */

export default function getMaxPropertiesByAccountType(accountType: string): number{
    switch(accountType){
        case 'regular':
            return 2;

        case 'pro':
            return 4;

        case 'enterprise':
            return -1;

        default: return 2;
    }
}