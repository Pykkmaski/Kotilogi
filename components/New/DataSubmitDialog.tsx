'use client';

import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { useInputData } from '@/hooks/useInputData';
import { Check } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useId, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../UI/Spinner';

type DataSubmitDialogProps<T extends {}> = React.PropsWithChildren & {
  onSubmit: (data: T) => Promise<AxiosResponse>;
  open: boolean;
  handleClose: () => void;
  title: string;
  initialData: T;
};

export function DataSubmitDialog<T extends {}>({
  children,
  title,
  onSubmit,
  open,
  handleClose,
  initialData,
}: DataSubmitDialogProps<T>) {
  const formId = useId();
  const { data, updateData } = useInputData(initialData);
  const [status, setStatus] = useState(FormStatus.IDLE);
  const loading = status == FormStatus.LOADING;

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form
          id={`form-${formId}`}
          onChange={updateData}
          onSubmit={async e => {
            e.preventDefault();
            setStatus(FormStatus.LOADING);

            await onSubmit(data)
              .then(res => {
                if (res.status == 200) {
                  toast.success(res.statusText);
                  handleClose();
                } else {
                  toast.error(res.statusText);
                }
              })
              .catch(err => toast.success(err.message))
              .finally(() => setStatus(FormStatus.IDLE));
          }}>
          {children}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant='text'
          type='button'>
          Peruuta
        </Button>
        <Button
          variant='contained'
          type='submit'
          startIcon={loading ? <Spinner size='1rem' /> : <Check />}>
          Vahvista
        </Button>
      </DialogActions>
    </Dialog>
  );
}
