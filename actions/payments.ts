'use server';

import { Prices, serviceName } from "kotilogi-app/constants";
import crypto from 'crypto';
import { getServerSession } from "next-auth";
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { UserPlanType, UserType } from "kotilogi-app/types/UserType";
import { OrderIdType } from "kotilogi-app/types/OrderIdType";

function generateAuthCode(orderNumber: string){
    const data = `${process.env.VISMA_API_KEY}|${orderNumber}`;
    return crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(data).digest('hex').toUpperCase();
}

function generateOrderNumber(user: UserType){
    return crypto.createHash('SHA256').update(Date.now() + user.email + user.plan).digest('hex').toUpperCase();
}

/**
 * 
 * @param id The id used in the order.
 */
function getOrderPrice(id: OrderIdType): number{
    let price: string | null = null;

    switch(id){
        case 'add_property':
            price =  process.env.PRICE_PROPERTY;
        break;
        
        case 'add_event':
            price = process.env.PRICE_EVENT;
        break;

        case 'add_usage':
            price = process.env.PRICE_USAGE;
        break;

        case 'add_file':
            price = process.env.PRICE_FILE;
        break;

       default: price = '0';
    }

    return parseInt(price);
}

/**
 * Creates a visma payment request.
 * @param id 
 * @returns 
 */
export async function makeOrder(id: OrderIdType){
    try{
        const session = await getServerSession(options as any) as any;
        const price = getOrderPrice(id);
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
                    'banks',
                ]
            },

            customer: {
                email: session.user.email,
            },

            products: [
                {
                    id: id,
                    title: `Tiedon lisäys`,
                    pretax_price: price,
                    count: 1,
                    tax: 24,
                    price: Math.round(price * 1.24),
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