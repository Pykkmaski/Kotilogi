import { sendResetCode } from 'kotilogi-app/actions/resetPassword';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';
import { useState } from 'react';
import toast from 'react-hot-toast';

export type ResetStepOneStatus = 'idle' | 'unknown' | 'invalid_email' | 'success' | 'loading';

export function useResetStepOne() {
  const [status, setStatus] = useState<ResetStepOneStatus>('idle');
  const { data, updateData } = useInputData({});

  const resetStepOneHandler = e => {
    e.preventDefault();
    setStatus('loading');

    const email = data.email;

    sendResetCode(email)
      .then(result => {
        setStatus(result as ResetStepOneStatus);

        if (result === 'success') {
          toast.success('Varmennuskoodi lähetetty onnistuneesti!');
        }
      })
      .catch(err => {
        setStatus(err.message);
      });
  };

  return {
    status,
    data,
    updateData,
    resetStepOneHandler,
  };
}
