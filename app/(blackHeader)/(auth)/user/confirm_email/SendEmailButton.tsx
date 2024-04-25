'use client';

import Button from '@/components/UI/Button/Button';
import { sendAccountActivationLink } from 'kotilogi-app/actions/email';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function SendEmailButton({ children, session }) {
  const [status, setStatus] = useState<'loading' | 'idle' | 'success'>('idle');

  const handleSend = async () => {
    setStatus('loading');
    const loadingToast = toast.loading('Lähetetään varmennuslinkkiä', {
      duration: Infinity,
    });

    sendAccountActivationLink(session.user.email)
      .then(() => {
        toast.success('Varmennuslinkki lähetetty!');
        setStatus('success');
      })
      .catch(err => {
        toast.error('Linkin lähetys epäonnistui! Yritä uudelleen.');
        setStatus('idle');
      })
      .finally(() => toast.dismiss(loadingToast));
  };

  const linkDisabled = status === 'loading' || status === 'success';

  return (
    <Button
      variant='primary-dashboard'
      onClick={handleSend}
      disabled={linkDisabled}>
      <span className='mx-8 font-semibold'>{children}</span>
    </Button>
  );
}
