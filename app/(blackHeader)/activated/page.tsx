'use client';

import { MainAllCentered } from '@/components/UI/Main';
import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ActivatedPage({ searchParams }) {
  const { update: updateSession } = useSession();

  useEffect(() => {
    updateSession({
      status: 1,
    })
      .then(() => toast.success('Istunto päivitetty'))
      .catch(err => toast.error(err.message));
  }, []);

  return (
    <MainAllCentered>
      <TitleWithParagraphLayout>
        <>Tilin aktivointi onnistui!</>
        <>Käyttäjätilisi {searchParams.email} on nyt käytössä.</>
        <Link
          data-testid='login-link'
          href='/login'
          className='text-teal-400'>
          Kirjaudu sisään
        </Link>
      </TitleWithParagraphLayout>
    </MainAllCentered>
  );
}
