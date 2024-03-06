import db from "kotilogi-app/dbconfig";
import Database from "./database";
import { Knex } from "knex";

class Billing{
    createBill(customer: string, amount: number){
        const dueDate = new Date();
        dueDate.setDate(1);
        dueDate.setMonth(dueDate.getMonth() + 1);

        const bill = {
            customer,
            amount,
            due: dueDate.getTime(),
        };
        
        return bill;
    }
}

export const billing = new Billing();