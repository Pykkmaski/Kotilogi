import { UserType } from "kotilogi-app/types/UserType";
import crypto from 'crypto';

export class Payment{
    generateAuthCode(orderNumber: string){
        const data = `${process.env.VISMA_API_KEY}|${orderNumber}`;
        return crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(data).digest('hex').toUpperCase();
    }

    generateOrderNumber(user: UserType){
        return crypto.createHash('SHA256').update(Date.now() + user.email + user.plan).digest('hex').toUpperCase();
    }
    
    createVismaProductArray(bills: TODO[]){
        return bills.map(bill => {
            const price = Math.round(bill.amount * 1.24);
            const preTaxPrice = bill.amount;
    
            return {
                id: bill.id,
                title: bill.stamp,
                pretax_price: preTaxPrice,
                count: 1,
                tax: 24,
                price: price,
                type: 1,
            }
        })
    }
}