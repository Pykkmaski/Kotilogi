'use client';

import { Check } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useId } from 'react';
import toast from 'react-hot-toast';
import { useFormOnChangeObject } from '@/hooks/useFormOnChangeObject';
import { useStatusWithAsyncMethod } from '@/hooks/useStatusWithAsyncMethod';
import { usePreventDefault } from '@/hooks/usePreventDefault';
import { Button } from './Button';

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
  const { data, updateData } = useFormOnChangeObject(initialData);
  const { method, status } = useStatusWithAsyncMethod(async () => {
    await onSubmit(data)
      .then(res => {
        if (res.status == 200) {
          toast.success(res.statusText);
          handleClose();
        } else {
          toast.error(res.statusText);
        }
      })
      .catch(err => toast.error(err.message));
  });
  const submitMethod = usePreventDefault(method);

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
          onSubmit={submitMethod}>
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
          loading={status === 'loading'}
          variant='contained'
          type='submit'
          startIcon={<Check />}>
          Vahvista
        </Button>
      </DialogActions>
    </Dialog>
  );
}
