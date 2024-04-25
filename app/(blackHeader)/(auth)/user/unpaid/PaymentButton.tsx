'use client';

import Button from '@/components/UI/Button/Button';
import { useRouter } from 'next/navigation';

export function PaymentButton({ children }) {
  const router = useRouter();

  const handlePayment = async () => {
    //const paymentToken = await makeOrder();
    //router.push(`https://www.vismapay.com/pbwapi/token/${paymentToken.token}`);
  };

  return (
    <Button
      variant='primary'
      onClick={handlePayment}>
      {children}
    </Button>
  );
}
