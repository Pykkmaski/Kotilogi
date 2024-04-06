'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { checkUserPassword } from "./util/checkUserPassword";

export async function deactivateProperty(property: Kotilogi.PropertyType, password: string){
    await checkUserPassword(property.refId, password).then(result => {
        if(!result){
            throw new Error('Invalid password');
        }
    });

    await db('properties').where({id: property.id}).update({
        status: 'deactivated',
    });

    revalidatePath('/dashboard/properties');
}