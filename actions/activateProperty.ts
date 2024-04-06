'use server';

import db from "kotilogi-app/dbconfig";
import { revalidatePath } from "next/cache";
import { createBill, createCart } from "./bills";
import { checkUserPassword } from "./util/checkUserPassword";

export async function activateProperty(data: {customer: string, password: string, propertyId: string}){

    await checkUserPassword(data.customer, data.password).then(result => {
        if(!result) throw new Error('Incorrect password!');
    });

    const trx = await db.transaction();
    await trx('properties').where({id: data.propertyId}).update({
        status: 'ok',
    }, ['refId', 'id'])
    .then(async ([{refId: customer, id: propertyId}]: {refId: string, id: string}[]) => {
        const bill = createBill(4990, propertyId, customer, 'activate_property');
        await trx('bills').insert(bill)
        await trx.commit();
        revalidatePath('/dashboard/properties');
    })
    .catch(async err => {
        await trx.rollback();
        throw err;
    });

    //revalidatePath('/dashboard/properties');
}