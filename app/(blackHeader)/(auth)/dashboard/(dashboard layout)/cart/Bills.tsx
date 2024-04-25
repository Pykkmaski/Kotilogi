'use client';

import { Gallery } from '@/components/new/Gallery/GalleryBase/Gallery';
import { CartBillItem } from './CartBillItem';
import { ImageError } from '@/components/new/Gallery/GalleryBase/Components/Error/ImageError';
import Button from '@/components/UI/Button/Button';
import { createContext, useContext, useEffect, useState } from 'react';
import { formatNumber } from 'kotilogi-app/utils/formatNumber';
import { createPaymentRequest } from 'kotilogi-app/actions/payments';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

type StatusType = 'idle' | 'loading';
type BillsContextProps = {
  status: StatusType;
  pay: (bills: TODO) => Promise<void>;
  dueBillIds?: string[];
};

const BillsContext = createContext<BillsContextProps>(null);

export function Bills({ bills }) {
  const router = useRouter();
  const [selectedBills, setSelectedBills] = useState([]);
  const [status, setStatus] = useState<StatusType>('idle');
  const searchParams = useSearchParams();

  const totalPrice = bills.reduce((acc, cur) => (acc += cur.amount), 0);

  const pay = async (bills: TODO[]) => {
    setStatus('loading');
    createPaymentRequest(bills)
      .then(async req => {
        router.push(`https://www.vismapay.com/pbwapi/token/${req.token}`);
      })
      .catch(err => toast.error(err.message))
      .finally(() => setStatus('idle'));
  };

  const loading = status === 'loading';

  useEffect(() => {
    const dueBillIds = searchParams.get('due')?.split(':');
    if (dueBillIds) {
      toast.error('Sinulla on maksamattomia laskuja!');
    }
  }, []);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h2 className='lg:text-xl xs:text-lg text-green-700'>
            {formatNumber(totalPrice / 100)}€{' '}
            <span className='text-slate-500 text-sm'>(+ALV 24%)</span>
          </h2>
          <Link
            className='text-orange-500'
            href='/tos/payments'
            target='_blank'>
            Maksuehdot
          </Link>
        </div>

        <div className='flex gap-4 items-center'>
          <Button
            variant='primary-dashboard'
            onClick={() => pay(bills)}
            loading={loading}
            disabled={loading}>
            <span className='lg:mx-8 xs:mx-2'>Maksa kaikki</span>
          </Button>
        </div>
      </div>

      <BillsContext.Provider value={{ status, pay }}>
        <div className='flex flex-col gap-2 mt-8'>
          {bills.map(bill => (
            <CartBillItem
              bill={bill}
              onSelect={() => {}}
            />
          ))}
        </div>
      </BillsContext.Provider>
    </div>
  );
}

export function useBillsContext() {
  const ctx = useContext(BillsContext);
  if (!ctx) throw new Error('useBillsContext must be used within the scope of a BillsContext!');
  return ctx;
}
