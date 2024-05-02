import axios from 'axios';
import crypto from 'crypto';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import db from 'kotilogi-app/dbconfig';
import { getServerSession } from 'next-auth';
import PaymentResult from './PaymentResult';
import { getPayment, getPaymentStatus } from './page.actions';
import { BillType } from 'kotilogi-app/types/BillType';

type ReturnCodeType = 0 | 1 | 4 | 10;

function createPaymentReq(orderNumber: string) {
  const authdata = `${process.env.VISMA_API_KEY}|${orderNumber}`;
  const authcode = crypto
    .createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET)
    .update(authdata)
    .digest('hex')
    .toUpperCase();
  return {
    version: 'w3.1',
    api_key: process.env.VISMA_API_KEY,
    order_number: orderNumber,
    authcode,
  };
}

function createPaymentStatusReq(orderNumber: string) {
  const authdata = `${process.env.VISMA_API_KEY}|${orderNumber}`;
  const authcode = crypto
    .createHmac('SHA256', process.env.VISMA_MERCHANT_SECRET)
    .update(authdata)
    .digest('hex')
    .toUpperCase();
  return {
    version: 'w3.1',
    api_key: process.env.VISMA_API_KEY,
    order_number: orderNumber,
    authcode: authcode,
  };
}

async function processProducts(payment) {
  for (const product of payment.payment_products) {
    const [bill] = await db('bills').where({ id: product.id });

    if (bill.stamp === 'property') {
      //Update the due date of bills relating to properties.
      const paid = Date.now();
      const dueDate = new Date(paid);
      dueDate.setFullYear(dueDate.getFullYear() + 1);

      const newDueDate = new Date();
      newDueDate.setFullYear(newDueDate.getFullYear() + 1);
      await db('bills').where({ id: bill.id }).update({
        due: newDueDate.getTime(),
        status: 'paid',
      });
    } else {
      //Delete any other kind of bill.
      console.log(bill);
      await db('bills').where({ id: bill.id }).del();
    }
  }
}

export default async function CheckoutResultPage({ searchParams }) {
  const orderNumber = searchParams.ORDER_NUMBER;
  const {
    data: { payment },
  } = await axios.post(
    'https://www.vismapay.com/pbwapi/get_payment',
    createPaymentReq(orderNumber)
  );

  const { data: paymentStatus } = await axios.post(
    'https://www.vismapay.com/pbwapi/check_payment_status',
    createPaymentStatusReq(orderNumber)
  );

  const session = (await getServerSession(options as any)) as any;
  const returnCode = parseInt(searchParams.RETURN_CODE);

  if (session && returnCode == 0) {
    await processProducts(payment);

    //Update the users status to active.
    await db('users')
      .where({ email: payment.customer.email })
      .update({
        status: 'active',
        trial: false,
      })
      .catch(async err => {
        console.log(err.message);
      });
  }

  return (
    <main className='flex flex-col w-full flex-1'>
      <PaymentResult
        paymentStatusCode={paymentStatus.source.error_code}
        returnCode={returnCode}
      />
    </main>
  );
}
