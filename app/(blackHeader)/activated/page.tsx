'use client';

import { TitleWithParagraphLayout } from '@/components/UI/TitleWithParagraphLayout';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ActivatedPage({ searchParams }) {
  const { update: updateSession } = useSession();

  useEffect(() => {
    updateSession({
      status: 'active',
    })
      .then(() => toast.success('Istunto päivitetty'))
      .catch(err => toast.error(err.message));
  }, []);

  return (
    <main className='flex flex-col items-center justify-center w-full h-full'>
      <TitleWithParagraphLayout>
        <>Tilin aktivointi onnistui!</>
        <>Käyttäjätilisi {searchParams.email} on nyt käytössä.</>
      </TitleWithParagraphLayout>
    </main>
  );
}
