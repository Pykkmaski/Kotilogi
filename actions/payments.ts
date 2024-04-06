'use server';

import { Prices, serviceName } from "kotilogi-app/constants";
import crypto from 'crypto';
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { UserPlanType, UserType } from "kotilogi-app/types/UserType";
import { OrderIdType } from "kotilogi-app/types/OrderIdType";
import db from "kotilogi-app/dbconfig";
import { createVismaProductArray } from "kotilogi-app/utils/createVismaProductArray";

function generateAuthCode(orderNumber: string){
    const data = `${process.env.VISMA_API_KEY}|${orderNumber}`;
    return crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(data).digest('hex').toUpperCase();
}

function generateOrderNumber(user: UserType){
    return crypto.createHash('SHA256').update(Date.now() + user.email + user.plan).digest('hex').toUpperCase();
}

export async function createPaymentRequest(bills: {
    amount: number;
    stamp: 'add_property' | 'activate_property' | 'charge_property';
    id: number;
}[]){
    const session = await getServerSession(options as any) as any;
    if(!session){
        throw new Error('Could not make the payment, as the user\'s session was not found!');
    }

    const products = createVismaProductArray(bills);
    const amount = products.reduce((acc, cur) => acc += cur.price, 0);
    const orderNumber = generateOrderNumber(session.user);
    
    const VISMA_API_KEY = process.env.VISMA_API_KEY;
    if(!VISMA_API_KEY) throw new Error('VISMA_API_KEY env variable missing!');

    const paymentRequest = {
        version: 'w3.1',
        api_key: VISMA_API_KEY,
        currency: 'EUR',
        amount,
        order_number: orderNumber,
        authcode: generateAuthCode(orderNumber),

        payment_method: {
            type: 'e-payment',
            return_url: `${process.env.SERVICE_DOMAIN}/checkout/result`,
            notify_url: process.env.SERVICE_DOMAIN,
            selected: [
                'banks',
            ]
        },

        customer: {
            email: session.user.email,
        },

        products,
    };

    const {data: paymentToken} = await axios.post('https://www.vismapay.com/pbwapi/auth_payment', paymentRequest);

    if(paymentToken.result === 0 && paymentToken.type === 'e-payment' || paymentToken.type === 'terminal'){
        return paymentToken;
    }
    else if(paymentToken.result !== 0){
        console.log(paymentToken);
        return null;
    }
}

/**
 * Creates a visma payment request.
 * @param id 
 * @returns 
 */
export async function makeOrder(){
    try{
        
    }
    catch(err){
        console.log(err.message);
    }

    return null;
}

export async function payBill(bill: TODO){
    return await createPaymentRequest(bill);
}