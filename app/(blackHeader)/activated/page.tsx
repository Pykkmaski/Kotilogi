'use client';

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
      <h1 className='text-2xl'>Tilin aktivointi onnistui!</h1>
      <p>Käyttäjätilisi {searchParams.email} on nyt käytössä.</p>
    </main>
  );
}
