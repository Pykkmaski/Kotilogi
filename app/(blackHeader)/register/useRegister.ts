import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';
import { ARegisterUser } from '@/actions/users';
import axios from 'axios';

export type RegisterStatusType =
  | 'idle'
  | 'unexpected'
  | 'user_exists'
  | 'password_mismatch'
  | 'loading'
  | 'success';

export type RegisterDataType = {
  email?: string;
  password1?: string;
  password2?: string;
  plan: 'regular' | 'pro';
};

export function useRegister() {
  const router = useRouter();
  const { data, updateData } = useInputData({ plan: 'regular' });
  const [status, setStatus] = useState<RegisterStatusType>('idle');

  const checkPasswordMatch = (password1: string, password2: string) => {
    return password1 === password2;
  };

  const registerHandler = async e => {
    e.preventDefault();

    if (!checkPasswordMatch(data.password, e.target.password2.value)) {
      setStatus('password_mismatch');
    } else {
      setStatus('loading');

      await axios
        .post('/api/public/users/register', {
          data: {
            email: data.email,
            password: data.password,
          },
        })
        .then(res => {
          if (res.status == 200) {
            toast.success(res.statusText);
            router.replace('/register/success');
          } else {
            toast.error(res.statusText);
          }
        });
    }
  };

  return {
    registerHandler,
    data,
    updateData,
    status,
  };
}
