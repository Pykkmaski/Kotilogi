import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';
import { registerUser } from 'kotilogi-app/actions/experimental/users';

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

  const registerHandler = e => {
    e.preventDefault();

    if (!checkPasswordMatch(data.password, e.target.password2.value)) {
      setStatus('password_mismatch');
    } else {
      setStatus('loading');

      registerUser(data)
        .then(status => {
          setStatus(status);

          if (status === 'success') {
            toast.success('Rekisteröityminen onnistui!');
            router.replace('/register/success');
          }
        })
        .catch(err => {
          toast.error(err.message);
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
