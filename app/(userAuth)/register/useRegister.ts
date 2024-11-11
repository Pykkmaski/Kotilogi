import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AUserExists } from '@/actions/users';
import axios from 'axios';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';

export type RegisterStatusType =
  | 'idle'
  | 'unexpected'
  | 'user_exists'
  | 'password_mismatch'
  | 'loading'
  | 'success'
  | 'loading_email';

export type RegisterDataType = {
  email?: string;
  password1?: string;
  password2?: string;
  plan: 'regular' | 'pro';
};

export function useRegister() {
  const router = useRouter();
  const { data, updateData } = useFormOnChangeObject({ plan: 'regular' } as {
    plan: string;
    email: string;
    password: string;
    password2: string;
  });
  const [status, setStatus] = useState<RegisterStatusType>('idle');

  const checkPasswordMatch = (password1: string, password2: string) => {
    return password1 === password2;
  };

  const registerHandler = async e => {
    e.preventDefault();

    if (!checkPasswordMatch(data.password, data.password2)) {
      setStatus('password_mismatch');
    } else {
      setStatus('loading');

      await axios
        .post('/api/public/users/register', {
          email: data.email,
          password: data.password,
        })
        .then(res => {
          toast.success(res.data.message);
          router.replace('/register/success');
          //setStatus('success');
        })
        .catch(err => {
          switch (err.response.status) {
            case 409:
              setStatus('user_exists');
              break;
            case 429:
              toast.error('Liian monta pyyntöä! Odota muutama minuutti ja yritä uudelleen.');
              break;
            default:
              toast.error(err.message);
          }
        })
        .finally(() => setStatus(prev => (prev == 'loading' ? 'idle' : prev)));
    }
  };

  useEffect(() => {
    if (!data.email || data.email.length == 0) return;

    const timeout = setTimeout(async () => {
      const userExists = await AUserExists(data.email);
      if (userExists) {
        setStatus('user_exists');
      } else {
        setStatus('idle');
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [data.email]);

  return {
    registerHandler,
    data,
    updateData,
    status,
  };
}
