import axios from 'axios';
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
      .get(`/api/public/users/reset_password?email=${email}`)
      .then(res => {
        if (res.status == 200) {
          toast.success(res.data.message);
          setStatus('success');
        }
      })
      .catch(err => {
        switch (err.response.status) {
          case 404: {
            toast.error(err.response.data.message);
            setStatus('invalid_email');
          }
          default:
            toast.error(err.message);
        }
      })
      .finally(() => setStatus(prev => (prev == 'loading' ? 'idle' : prev)));
  };

  return {
    status,
    data,
    updateData,
    resetStepOneHandler,
  };
}
