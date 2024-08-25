import axios from 'axios';
import { sendResetCode } from 'kotilogi-app/actions/resetPassword';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';
import { useState } from 'react';
import toast from 'react-hot-toast';

export type ResetStepOneStatus = 'idle' | 'unknown' | 'invalid_email' | 'success' | 'loading';

export function useResetStepOne() {
  const [status, setStatus] = useState<ResetStepOneStatus>('idle');
  const { data, updateData } = useInputData({});

  const resetStepOneHandler = async e => {
    e.preventDefault();
    setStatus('loading');

    const email = data.email;
    axios
      .get(`/api/public/users/reset/password?email=${email}`)
      .then(res => {
        if (res.status == 200) {
          toast.success(res.data);
          setStatus('success');
        } else {
          toast.error(res.statusText);
          setStatus('idle');
        }
      })
      .catch(err => {
        toast.error(err.message);
        setStatus('idle');
      });
  };

  return {
    status,
    data,
    updateData,
    resetStepOneHandler,
  };
}
