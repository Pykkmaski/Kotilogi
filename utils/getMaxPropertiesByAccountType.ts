'use client';

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