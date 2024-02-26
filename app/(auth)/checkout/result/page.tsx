import axios from "axios";
import crypto from 'crypto';
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import db from "kotilogi-app/dbconfig";
import { getServerSession } from "next-auth";
import PaymentResult from "./PaymentResult";

type ReturnCodeType = 0 | 1 | 4 | 10;

async function getPayment(orderNumber: string){
    const authdata = `${process.env.VISMA_API_KEY}|${orderNumber}`;
    const authcode = crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(authdata).digest('hex').toUpperCase();
    const {data: payment} = await axios.post('https://www.vismapay.com/pbwapi/get_payment', {
        version: 'w3.1',
        api_key: process.env.VISMA_API_KEY,
        order_number: orderNumber,
        authcode,
    });

    return payment;
}

async function getPaymentStatus(orderNumber: string){
    const authdata = `${process.env.VISMA_API_KEY}|${orderNumber}`;
    const authcode = crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(authdata).digest('hex').toUpperCase();
    
    const {data: paymentStatus} = await axios.post('https://www.vismapay.com/pbwapi/check_payment_status', {
        version: 'w3.1',
        api_key: process.env.VISMA_API_KEY,
        order_number: orderNumber,
        authcode,
    });

    return paymentStatus;
}

export default async function CheckoutResultPage({searchParams}){

    const session = getServerSession(options as any) as any;
    const returnCode = parseInt(searchParams.RETURN_CODE);

    const [{payment}, paymentStatus] = await Promise.all([
        getPayment(searchParams.ORDER_NUMBER), 
        getPaymentStatus(searchParams.ORDER_NUMBER)
    ]);

    if(returnCode == 0){
        await db('billing').insert({
            customer: payment.customer.email,
            cardToken: payment.source.card_token,
            price: payment.amount,
            tax: 24,
            productTitle: payment.payment_products[0].title,
            productId: payment.payment_products[0].id,
            timestamp: Date.now().toString(),
        })
        .onConflict('customer')
        .merge();

        //Update the users status to active.
        await db('users').where({email: payment.customer.email}).update({
            status: 'active',
            trial: false,
        });
    }

    return (
        <main className="flex flex-col w-full flex-1">
           <PaymentResult paymentStatusCode={paymentStatus.source.error_code} returnCode={returnCode}/>
        </main>
    )
}