import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';
import axios from 'axios';

type ResetStepTwoStatus =
  | 'idle'
  | 'unknown'
  | 'success'
  | 'loading'
  | 'password_mismatch'
  | 'unexpected';

export function useResetStepTwo() {
  const params = useSearchParams();
  const router = useRouter();
  const { data, updateData } = useInputData({});
  const [status, setStatus] = useState<ResetStepTwoStatus>('idle');

  const resetStepTwoHandler = async e => {
    e.preventDefault();
    setStatus('loading');

    const password1: string = data.password1;
    const password2: string = data.password2;

    const token = params.get('token');

    if (!token) {
      toast.error('Salasanan nollaustodennus puuttuu!');
      setStatus('idle');
    } else if (password1 !== password2) {
      setStatus('password_mismatch');
    } else {
      await axios
        .post(
          '/api/public/users/reset_password',
          { password: password1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(res => {
          if (res.status == 200) {
            toast.success('Salasanan vaihto onnistui!');
            router.push('/login');
          }
        })
        .catch(err => toast.error(err.message))
        .finally(() => {
          setStatus('idle');
        });
    }
  };

  return {
    status,
    data,
    updateData,
    resetStepTwoHandler,
  };
}
