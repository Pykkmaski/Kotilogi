import { Knex } from "knex";
import db from "kotilogi-app/dbconfig";

export function createBill(amount: number, targetId: string, customer: string, stamp: string){
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);

    return {
        amount,
        stamp,
        targetId,
        customer,
        due: dueDate.getTime(),
    }
}

type CartType = {
    due: number,
    customer: string,
}

/**
 * Creates a cart and returns it. If a cart already exists, returns that instead.
 * @param customer 
 * @returns 
 */
export function createCart(customer: string){
    try{
        const dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + 1);

        return {
            customer,
            due: dueDate.getTime(),
        }
    }
    catch(err){
        console.log(err.message);
    }
}