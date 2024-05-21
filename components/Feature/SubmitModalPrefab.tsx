'use client';

import { useToggle } from 'kotilogi-app/hooks/useToggle';
import { Modal } from '../UI/Modal';
import { SubmitDataModalProvider } from './SubmitDataModal';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import { useEffect, useRef } from 'react';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useSubmitData } from '@/hooks/useSubmitData';
import { DialogControl } from '../Util/DialogControl';
import { Check } from '@mui/icons-material';
import toast from 'react-hot-toast';

type SubmitModalPrefabProps<T extends {}> = React.PropsWithChildren & {
  trigger: JSX.Element;
  modalTitle: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;

  submitMethod: (data: T, files?: FormData[]) => Promise<void>;
  submitText?: string;
  cancelText?: string;
  icon: string;
};

/**Renders a trigger, that when pressed, reveals a SubmitDataModal, containing the passed children in its form. */
export function SubmitModalPrefab<T extends {}>({
  children,
  trigger,
  modalTitle,
  cancelText = 'Peruuta',
  submitText = 'Lähetä',
  successText,
  errorText,
  loadingText,
  icon,
  submitMethod,
}: SubmitModalPrefabProps<T>) {
  const { state: visible, toggleState } = useToggle(false);

  const submit = async (data: T, files?: FormData[]) => {
    await submitMethod(data, files).then(() => {
      toggleState(false);
    });
  };

  return (
    <>
      <DialogControl
        trigger={({ onClick }) => {
          return React.cloneElement(trigger, {
            ...trigger.props,
            onClick,
          });
        }}
        control={({ show, handleClose }) => {
          const formRef = useRef<HTMLFormElement>(null);
          //const formId = useId();

          const { updateData, updateDataViaProperty, updateFiles, submit, status } =
            useSubmitData<T>({} as any, async (data, files) => {
              const loadingToast = toast.loading(loadingText);
              submitMethod(data, files)
                .then(() => {
                  toast.success(successText);
                  formRef.current?.reset();
                })
                .finally(() => toast.dismiss(loadingToast));
            });
          const loading = status === 'loading';

          return (
            <Dialog
              fullWidth
              maxWidth='md'
              open={show}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: async e => {
                  await submit(e);
                  handleClose();
                },
                onChange: e => (e.target.type === 'file' ? updateFiles(e) : updateData(e)),
                ref: formRef,
              }}>
              <DialogTitle>{modalTitle}</DialogTitle>
              <DialogContent className='flex flex-col gap-4'>{children}</DialogContent>
              <DialogActions>
                <Button
                  type='button'
                  variant='text'
                  onClick={handleClose}
                  disabled={loading}>
                  {cancelText}
                </Button>

                <Button
                  type='submit'
                  variant='text'
                  startIcon={<Check />}
                  disabled={loading}>
                  {submitText}
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      />
      {/**
       * <VisibilityProvider
        visible={visible}
        toggleOverride={toggleState}>
        <VisibilityProvider.Trigger>{trigger}</VisibilityProvider.Trigger>
        <VisibilityProvider.Target>
          <SubmitDataModalProvider submitMethod={submit}>
            <Modal.DefaultContentContainer>
              <Modal.HeaderWithTitle
                title={modalTitle}
                icon={icon}
              />
              <SubmitDataModalProvider.Form>{children}</SubmitDataModalProvider.Form>
              <SubmitDataModalProvider.Footer
                submitText={submitText}
                cancelText={cancelText}
              />
            </Modal.DefaultContentContainer>
          </SubmitDataModalProvider>
        </VisibilityProvider.Target>
      </VisibilityProvider>
       */}
    </>
  );
}
