'use client';

import Button from '@/components/UI/Button/Button';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export function ReloginButton({ children }) {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const relogin = async () => {
    setStatus('loading');
    await signOut({
      callbackUrl: '/login',
    });
  };

  const loading = status === 'loading';

  return (
    <Button
      variant='primary'
      onClick={relogin}
      loading={loading}
      disabled={loading}>
      {children}
    </Button>
  );
}
