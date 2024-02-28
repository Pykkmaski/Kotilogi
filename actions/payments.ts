'use server';

import { Prices, serviceName } from "kotilogi-app/constants";
import crypto from 'crypto';
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { UserPlanType, UserType } from "kotilogi-app/types/UserType";

function generateAuthCode(orderNumber: string){
    const data = `${process.env.VISMA_API_KEY}|${orderNumber}`;
    return crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(data).digest('hex').toUpperCase();
}

function generateOrderNumber(user: UserType){
    return crypto.createHash('SHA256').update(Date.now() + user.email + user.plan).digest('hex').toUpperCase();
}

export async function makeOrder(plan: UserPlanType){
    try{
        const session = await getServerSession(options as any) as any;
        const price = Math.round(Prices[plan] * (1 + Prices.TAX));
        const orderNumber = generateOrderNumber(session.user);
        
        const VISMA_API_KEY = process.env.VISMA_API_KEY;
        if(!VISMA_API_KEY) throw new Error('VISMA_API_KEY env variable missing!');

        const paymentRequest = {
            version: 'w3.1',
            api_key: VISMA_API_KEY,
            currency: 'EUR',
            amount: price,
            order_number: orderNumber,
            authcode: generateAuthCode(orderNumber),

            payment_method: {
                type: 'e-payment',
                register_card_token: 1,
                return_url: `${process.env.SERVICE_DOMAIN}/checkout/result`,
                notify_url: 'http://localhost:3000/',
                selected: [
                    'creditcards',
                ]
            },

            customer: {
                email: session.user.email,
            },

            products: [
                {
                    id: plan === 'regular' ? 'kdk-00' : 'kdk-01',
                    title: `${serviceName}, ${plan}-tilaus.`,
                    pretax_price: Prices[plan],
                    count: 1,
                    tax: Prices.TAX * 100,
                    price: Math.round(Prices[plan] * (1 + Prices.TAX)),
                    type: 1,
                },
            ]
        };

        console.log(paymentRequest);
        const {data: paymentToken} = await axios.post('https://www.vismapay.com/pbwapi/auth_payment', paymentRequest);

        if(paymentToken.result === 0 && paymentToken.type === 'e-payment' || paymentToken.type === 'terminal'){
            return paymentToken;
        }
        else if(paymentToken.result !== 0){
            console.log(paymentToken);
        }
    }
    catch(err){
        console.log(err.message);
    }

    return null;
}