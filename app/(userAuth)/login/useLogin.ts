import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export type LoginStatusType =
  | 'idle'
  | 'success'
  | 'unexpected'
  | 'password_mismatch'
  | 'invalid_user'
  | 'loading'
  | 'trial_expired'
  | 'user_inactive';

export function useLogin() {
  const router = useRouter();
  const [status, setStatus] = useState<LoginStatusType>('idle');
  const { data, updateData } = useFormOnChangeObject({} as { email: string; password: string });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callback');

  const loginHandler = e => {
    e.preventDefault();
    setStatus('loading');

    const credentials = {
      email: data.email,
      password: data.password,
      redirect: false,
    };

    signIn('credentials', credentials)
      .then(res => {
        if (res) {
          if (res.error) {
            setStatus(res.error as any);
          } else {
            setStatus('success');
            router.push(callbackUrl || '/dashboard');
          }
        }
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  return {
    loginHandler,
    status,
    data,
    updateData,
  };
}
