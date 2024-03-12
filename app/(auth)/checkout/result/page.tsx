import axios from "axios";
import crypto from 'crypto';
import { options } from "kotilogi-app/app/api/auth/[...nextauth]/options";
import db from "kotilogi-app/dbconfig";
import { getServerSession } from "next-auth";
import PaymentResult from "./PaymentResult";
import { getPayment, getPaymentStatus } from "./page.actions";

type ReturnCodeType = 0 | 1 | 4 | 10;

function createPaymentReq(orderNumber: string){
    const authdata = `${process.env.VISMA_API_KEY}|${orderNumber}`;
    const authcode = crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(authdata).digest('hex').toUpperCase();
    return {
        version: 'w3.1',
        api_key: process.env.VISMA_API_KEY,
        order_number: orderNumber,
        authcode,
    }
}

function createPaymentStatusReq(orderNumber: string){
    const authdata = `${process.env.VISMA_API_KEY}|${orderNumber}`;
    const authcode = crypto.createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET).update(authdata).digest('hex').toUpperCase();
    return {
        version: 'w3.1',
        api_key: process.env.VISMA_API_KEY,
        order_number: orderNumber,
        authcode: authcode,
    }
}

export default async function CheckoutResultPage({searchParams}){

    const orderNumber = searchParams.ORDER_NUMBER;
    const {data: {payment}} = await axios.post('https://www.vismapay.com/pbwapi/get_payment', createPaymentReq(orderNumber));
    const {data: paymentStatus} = await axios.post('https://www.vismapay.com/pbwapi/check_payment_status', createPaymentStatusReq(orderNumber));

    const session = await getServerSession(options as any) as any;
    if(!session) {
        throw new Error('Failed to load the user\'s session!');
    }

    const returnCode = parseInt(searchParams.RETURN_CODE);

    if(returnCode == 0){
        const paid = Date.now();
        const dueDate = new Date(paid);
        dueDate.setMonth(dueDate.getMonth() + 1);

        //Remove the user's cart.
        const trx = await db.transaction();
        await trx('carts').where({customer: session.user.email}).del()
        .then(async () => {
            //Update the users status to active.
            await trx('users').where({email: payment.customer.email}).update({
                status: 'active',
                trial: false,
            });
        })
        .then(async () => {
            await trx.commit();
        })
        .catch(async err => {
            console.log(err.message);
            await trx.rollback();
        });
    }

    return (
        <main className="flex flex-col w-full flex-1">
           <PaymentResult paymentStatusCode={paymentStatus.source.error_code} returnCode={returnCode}/>
        </main>
    )
}