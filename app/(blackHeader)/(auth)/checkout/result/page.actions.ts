'use server';
import crypto from 'crypto';
import axios from 'axios';
import db from 'kotilogi-app/dbconfig';

export async function getPayment(orderNumber: string){
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

export async function getPaymentStatus(orderNumber: string){
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

export async function addBillingData(payment: any){
    return await db('billing').insert({
        customer: payment.customer.email,
        cardToken: payment.source.card_token,
        price: payment.amount,
        tax: 24,
        productTitle: payment.payment_products[0].title,
        productId: payment.payment_products[0].id,
        timestamp: Date.now().toString(),
    }, '*')
    .onConflict('customer')
    .merge();
}

export async function updateUserStatus(payment: any){
    return await db('users').where({email: payment.customer.email}).update({
        status: 'active',
        trial: false,
        plan: payment.payment_products[0].title.includes('regular') ? 'regular' : 'pro',
    }, 'status', 'plan');
}