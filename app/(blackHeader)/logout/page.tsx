'use client';

import Spinner from '@/components/Spinner/Spinner';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default async function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
      router.refresh();
      //toast.success('Olet kirjautunut ulos!');
    });
  }, []);

  return (
    <main className='flex flex-col gap-2 items-center justify-center flex-1 text-slate-500'>
      <h1 className='text-4xl'>Kirjaudutaan Ulos...</h1>
      <span className='text-lg'>Ole hyvä ja odota.</span>
      <Spinner size='2rem' />
    </main>
  );
}
