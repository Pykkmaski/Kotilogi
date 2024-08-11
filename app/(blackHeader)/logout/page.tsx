'use client';

import { ALogoutUser } from '@/actions/users';
import { MainAllCentered } from '@/components/UI/Main';
import Spinner from '@/components/UI/Spinner';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default async function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push('/');
      router.refresh();
    });
  }, []);

  return (
    <MainAllCentered id='logout-page'>
      <TitleWithParagraphLayout>
        <>Kirjaudutaan Ulos...</>
        <>Ole hyvä ja odota.</>
        <div className='w-full flex justify-center'>
          <Spinner size='2rem' />
        </div>
      </TitleWithParagraphLayout>
    </MainAllCentered>
  );
}
