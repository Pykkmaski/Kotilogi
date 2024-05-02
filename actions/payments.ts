'use server';

import { getServerSession } from 'next-auth';
import { options } from 'kotilogi-app/app/api/auth/[...nextauth]/options';
import axios from 'axios';
import { Payment } from 'kotilogi-app/utils/payment';
import { UserType } from '@/types/UserType';

export async function createPaymentRequest(
  bills: {
    amount: number;
    stamp: 'add_property' | 'activate_property' | 'charge_property';
    id: number;
  }[]
) {
  const session = (await getServerSession(options as any)) as { user: UserType };
  if (!session) {
    throw new Error("Could not make the payment, as the user's session was not found!");
  }

  const payment = new Payment();
  const orderNumber = payment.generateOrderNumber(session.user);
  const products = payment.createVismaProductArray(bills);
  const authcode = payment.generateAuthCode(orderNumber);
  const amount = products.reduce((acc, cur) => (acc += cur.price), 0);

  const VISMA_API_KEY = process.env.VISMA_API_KEY;
  if (!VISMA_API_KEY) throw new Error('VISMA_API_KEY env variable missing!');

  const paymentRequest = {
    version: 'w3.1',
    api_key: VISMA_API_KEY,
    currency: 'EUR',
    amount,
    order_number: orderNumber,
    authcode,

    payment_method: {
      type: 'e-payment',
      return_url: `${process.env.SERVICE_DOMAIN}/checkout/result`,
      notify_url: process.env.SERVICE_DOMAIN,
      selected: ['banks'],
    },

    customer: {
      email: session.user.email,
    },

    products,
  };

  const { data: paymentToken } = await axios.post(
    'https://www.vismapay.com/pbwapi/auth_payment',
    paymentRequest
  );

  if (
    (paymentToken.result === 0 && paymentToken.type === 'e-payment') ||
    paymentToken.type === 'terminal'
  ) {
    return paymentToken;
  } else if (paymentToken.result !== 0) {
    console.log(paymentToken);
    return null;
  }
}
